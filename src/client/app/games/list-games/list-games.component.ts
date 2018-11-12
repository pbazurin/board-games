import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import { debounceTime, startWith, switchMap, takeUntil, tap } from 'rxjs/operators';

import { GameCreatedAction, GameRemovedAction, GameUserJoinedAction, GameUserLeftAction } from '@dto/game/game-actions';
import { GameTypeNames } from '@dto/game/game-type.enum';
import { GameDto } from '@dto/game/game.dto';

import { SocketService } from '../../core/services/socket.service';
import { GamesService } from '../games.service';

@Component({
  selector: 'bg-list-games',
  templateUrl: './list-games.component.html',
  styleUrls: ['./list-games.component.scss']
})
export class ListGamesComponent implements OnInit, OnDestroy {
  gameTypeName = GameTypeNames;
  isLoading = true;
  games: GameDto[] = [];

  private tearDown$ = new Subject();

  constructor(
    private gamesService: GamesService,
    private socketService: SocketService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    this.socketService
      .listenAnyOf(
        GameCreatedAction,
        GameRemovedAction,
        GameUserJoinedAction,
        GameUserLeftAction
      )
      .pipe(
        startWith(-1),
        takeUntil(this.tearDown$),
        debounceTime(1000),
        switchMap(() => this.gamesService.getAllRunningGames()),
        tap(() => this.isLoading = true)
      ).subscribe(
        games => {
          this.isLoading = false;
          this.games = games;
        },
        error => {
          // TODO: add global error handling. But since so far we have only one list, it's ok
          this.isLoading = false;
          let snackRef = this.snackBar.open(error.message, 'Close');
          snackRef.onAction().subscribe(() => snackRef.dismiss());
        }
      );
  }

  joinGame(gameId: number) {
    this.router.navigate(['games', 'test', gameId]);
  }

  ngOnDestroy() {
    this.tearDown$.next();
    this.tearDown$.complete();
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { interval, Subject } from 'rxjs';
import { startWith, switchMap, takeUntil, tap } from 'rxjs/operators';

import { Game } from '../../../../shared/models/game/game';
import { GameType } from '../../../../shared/models/game/game-type.enum';
import { GamesService } from '../games.service';

@Component({
  selector: 'bg-list-games',
  templateUrl: './list-games.component.html',
  styleUrls: ['./list-games.component.scss']
})
export class ListGamesComponent implements OnInit, OnDestroy {
  gameType = GameType;
  isLoading = false;
  games: Game[] = [];

  private tearDown$ = new Subject();

  constructor(
    private gamesService: GamesService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    interval(5000).pipe(
      startWith(-1),
      takeUntil(this.tearDown$),
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
    console.log(`Joining game ${gameId}`);
  }

  ngOnDestroy() {
    this.tearDown$.next();
    this.tearDown$.complete();
  }
}

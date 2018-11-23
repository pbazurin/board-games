import { Component, OnDestroy, OnInit } from '@angular/core';
import { Sort } from '@angular/material';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import { debounceTime, startWith, switchMap, takeUntil, tap } from 'rxjs/operators';

import { GameCreatedAction, GameRemovedAction, GameUserJoinedAction, GameUserLeftAction } from '@dto/game/game-actions';
import { GameType, GameTypeNames } from '@dto/game/game-type.enum';
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
  gameTypeIcons: { [index: number]: string } = {
    [GameType.Munchkin]: 'icon-enter',
    [GameType.Test]: 'icon-bug'
  };
  displayedColumns: string[] = ['type', 'name', 'weight', 'symbol'];

  private tearDown$ = new Subject();

  constructor(
    private gamesService: GamesService,
    private socketService: SocketService,
    private router: Router
  ) {}

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
        tap(() => (this.isLoading = true))
      )
      .subscribe(
        games => {
          this.isLoading = false;
          this.games = games;
        },
        () => {
          this.isLoading = false;
        }
      );
  }

  joinGame(game: GameDto) {
    this.router.navigate(['games', GameType[game.type].toLowerCase(), game.id]);
  }

  ngOnDestroy() {
    this.tearDown$.next();
    this.tearDown$.complete();
  }

  sortData(sort: Sort) {
    const data = this.games.slice();
    if (!sort.active || sort.direction === '') {
      this.games = data;
      return;
    }

    this.games = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'type':
          return compare(a.type, b.type, isAsc);
        case 'name':
          return compare(a.name, b.name, isAsc);
        case 'players':
          return compare(a.userIds.length, b.userIds.length, isAsc);
        case 'created':
          return compare(
            a.createdDate.getDate(),
            b.createdDate.getDate(),
            isAsc
          );
        default:
          return 0;
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

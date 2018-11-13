import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subject } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';

import { LeaveGameAction } from '@dto/game/game-actions';

import { SocketService } from '../../core/services/socket.service';
import { GameMunchkinService } from './game-munchkin.service';

@Component({
  selector: 'bg-game-munchkin',
  templateUrl: './game-munchkin.component.html'
})
export class GameMunchkinComponent implements OnInit, OnDestroy {
  gameId: string;

  private tearDown$ = new Subject();

  constructor(
    private route: ActivatedRoute,
    private socketService: SocketService,
    private gameMunchkinService: GameMunchkinService
  ) { }

  ngOnInit() {
    this.route.params
      .pipe(
        takeUntil(this.tearDown$),
        tap(params => this.gameId = params['gameId']),
        switchMap(() => this.gameMunchkinService.joinGame(this.gameId))
      )
      .subscribe();
  }

  ngOnDestroy() {
    if (this.gameId) {
      this.socketService.emit(new LeaveGameAction(this.gameId));
    }

    this.tearDown$.next();
    this.tearDown$.complete();
  }
}

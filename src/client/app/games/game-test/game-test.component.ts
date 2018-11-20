import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subject } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';

import { LeaveGameAction } from '@dto/game/game-actions';

import { SocketService } from '../../core/services/socket.service';
import { GameTestService } from './game-test.service';

@Component({
  selector: 'bg-game-test',
  templateUrl: './game-test.component.html',
  styleUrls: ['./game-test.component.scss']
})
export class GameTestComponent implements OnInit, OnDestroy {
  gameId: string;

  private tearDown$ = new Subject();

  constructor(
    private route: ActivatedRoute,
    private socketService: SocketService,
    private gameTestService: GameTestService
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        takeUntil(this.tearDown$),
        tap(params => (this.gameId = params['gameId'])),
        switchMap(() => this.gameTestService.joinGame(this.gameId))
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

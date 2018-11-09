import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { JoinGameAction, LeaveGameAction } from '@dto/game/game-actions';

import { SocketService } from '../../core/services/socket.service';

@Component({
  selector: 'bg-game-munchkin',
  templateUrl: './game-munchkin.component.html'
})
export class GameMunchkinComponent implements OnInit, OnDestroy {
  gameId: string;

  private tearDown$ = new Subject();

  constructor(
    private route: ActivatedRoute,
    private socketService: SocketService
  ) { }

  ngOnInit() {
    this.route.params
      .pipe(takeUntil(this.tearDown$))
      .subscribe(params => {
        this.gameId = params['id'];

        this.socketService.emit(new JoinGameAction(this.gameId));
      });
  }

  ngOnDestroy() {
    if (this.gameId) {
      this.socketService.emit(new LeaveGameAction(this.gameId));
    }

    this.tearDown$.next();
    this.tearDown$.complete();
  }
}

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Game } from '../../../shared/models/game/game';
import { DialogNewGameComponent } from './dialog-new-game/dialog-new-game.component';
import { GamesService } from './games.service';

@Component({
  selector: 'bg-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {
  games: Game[] = [];

  constructor(
    private dialog: MatDialog,
    private gamesService: GamesService
  ) { }

  ngOnInit() {
    this.gamesService.getAllRunningGames().subscribe(games => this.games = games);
  }

  openStartNewGameDialog() {
    this.dialog.open(DialogNewGameComponent, { width: '300px' });
  }
}

import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';

import { DialogNewGameComponent } from './dialog-new-game/dialog-new-game.component';

@Component({
  selector: 'bg-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent {
  constructor(
    private dialog: MatDialog
  ) { }

  openStartNewGameDialog() {
    this.dialog.open(DialogNewGameComponent, { width: '300px' });
  }
}

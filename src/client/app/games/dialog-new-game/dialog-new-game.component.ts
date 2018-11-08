import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

import { GameType } from '../../../../shared/dto/game/game-type.enum';
import { GamesService } from '../games.service';

@Component({
  selector: 'bg-dialog-new-game',
  templateUrl: './dialog-new-game.component.html'
})
export class DialogNewGameComponent {
  gameTypes = Object.values(GameType);
  selectedGameType: GameType = this.gameTypes[0];

  constructor(
    private dialogRef: MatDialogRef<DialogNewGameComponent>,
    private gamesService: GamesService,
    private router: Router
  ) { }

  onSubmit() {
    this.gamesService.startNewGame(this.selectedGameType)
      .subscribe(newGameId => {
        this.dialogRef.close();
        this.router.navigate(['games', 'test', newGameId]);
      });
  }
}

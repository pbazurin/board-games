import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

import { GameType, GameTypeNames } from '../../../../shared/dto/game/game-type.enum';
import { GamesService } from '../games.service';

@Component({
  selector: 'bg-dialog-new-game',
  templateUrl: './dialog-new-game.component.html'
})
export class DialogNewGameComponent {
  gameTypeNames = GameTypeNames;
  gameTypes = [GameType.Test, GameType.Munchkin];
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
        this.router.navigate(['games', GameType[this.selectedGameType].toLowerCase(), newGameId]);
      });
  }
}

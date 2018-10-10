import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { GameType } from '../../../../shared/models/game/game-type.enum';

@Component({
  selector: 'bg-dialog-new-game',
  templateUrl: './dialog-new-game.component.html'
})
export class DialogNewGameComponent {
  gameTypes = Object.values(GameType);
  selectedGameType: GameType = this.gameTypes[0];

  constructor(
    private dialogRef: MatDialogRef<DialogNewGameComponent>
  ) { }

  onSubmit() {
    this.dialogRef.close();
  }
}

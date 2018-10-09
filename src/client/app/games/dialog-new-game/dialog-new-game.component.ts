import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'bg-dialog-new-game',
  templateUrl: './dialog-new-game.component.html'
})
export class DialogNewGameComponent {
  constructor(
    private dialogRef: MatDialogRef<DialogNewGameComponent>
  ) { }

  onSubmit() {
    this.dialogRef.close();
  }
}

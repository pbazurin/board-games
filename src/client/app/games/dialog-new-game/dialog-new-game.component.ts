import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { GameType, GameTypeNames } from '../../../../shared/dto/game/game-type.enum';
import { GameMunchkinService } from '../game-munchkin/game-munchkin.service';
import { GameTestService } from '../game-test/game-test.service';

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
    private router: Router,
    private gameTestService: GameTestService,
    private gameMunchkinService: GameMunchkinService
  ) { }

  onSubmit() {
    let startNewGame$: Observable<string>;

    switch (this.selectedGameType) {
      case GameType.Test:
        startNewGame$ = this.gameTestService.startNewGame();
        break;
      case GameType.Munchkin:
        startNewGame$ = this.gameMunchkinService.startNewGame();
        break;
    }

    startNewGame$
      .subscribe(newGameId => {
        this.dialogRef.close();
        this.router.navigate(['games', GameType[this.selectedGameType].toLowerCase(), newGameId]);
      });
  }
}

import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { CreateMunchkinGameDto } from '@dto/game-munchkin/create-munchkin-game.dto';
import { CreateTestGameDto } from '@dto/game-test/create-test-game.dto';

import { GameType, GameTypeNames } from '../../../../shared/dto/game/game-type.enum';
import { GameMunchkinService } from '../game-munchkin/game-munchkin.service';
import { GameTestService } from '../game-test/game-test.service';

@Component({
  selector: 'bg-dialog-new-game',
  templateUrl: './dialog-new-game.component.html'
})
export class DialogNewGameComponent {
  gameTypeNames = GameTypeNames;
  gameTypes = [GameType.Munchkin, GameType.Test];
  selectedGameType: GameType = this.gameTypes[0];
  gameName: string;

  constructor(
    private dialogRef: MatDialogRef<DialogNewGameComponent>,
    private router: Router,
    private gameTestService: GameTestService,
    private gameMunchkinService: GameMunchkinService
  ) {}

  onSubmit() {
    let startNewGame$: Observable<string>;

    switch (this.selectedGameType) {
      case GameType.Munchkin: {
        const createGameDto = <CreateMunchkinGameDto>{ name: this.gameName };
        startNewGame$ = this.gameMunchkinService.startNewGame(createGameDto);
        break;
      }
      case GameType.Test: {
        const createGameDto = <CreateTestGameDto>{ name: this.gameName };
        startNewGame$ = this.gameTestService.startNewGame(createGameDto);
        break;
      }
    }

    startNewGame$.subscribe(newGameId => {
      this.dialogRef.close();
      this.router.navigate([
        'games',
        GameType[this.selectedGameType].toLowerCase(),
        newGameId
      ]);
    });
  }
}

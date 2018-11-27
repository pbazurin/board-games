import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { CreateMunchkinGameDto } from '@dto/game-munchkin/create-munchkin-game.dto';
import { CreateTestGameDto } from '@dto/game-test/create-test-game.dto';

import { GameType, GameTypeNames } from '../../../../shared/dto/game/game-type.enum';
import { GamesService } from '../games.service';

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
    private gamesService: GamesService
  ) {}

  onSubmit() {
    let startNewGame$: Observable<string>;

    switch (this.selectedGameType) {
      case GameType.Munchkin: {
        const createGameDto = <CreateMunchkinGameDto>{ name: this.gameName };
        startNewGame$ = this.gamesService.startNewMunchkinGame(createGameDto);
        break;
      }
      case GameType.Test: {
        const createGameDto = <CreateTestGameDto>{ name: this.gameName };
        startNewGame$ = this.gamesService.startNewTestGame(createGameDto);
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

import { NgModule } from '@angular/core';

import { SharedUIModule } from '../shared/shared-ui.module';
import { DialogNewGameComponent } from './dialog-new-game/dialog-new-game.component';
import { GameMunchkinModule } from './game-munchkin/game-munchkin.module';
import { GameTestModule } from './game-test/game-test.module';
import { GamesComponent } from './games.component';
import { GamesService } from './games.service';
import { ListGamesComponent } from './list-games/list-games.component';

@NgModule({
  imports: [SharedUIModule, GameTestModule, GameMunchkinModule],
  declarations: [GamesComponent, DialogNewGameComponent, ListGamesComponent],
  entryComponents: [DialogNewGameComponent],
  providers: [GamesService],
  exports: [GamesComponent]
})
export class GamesModule {}

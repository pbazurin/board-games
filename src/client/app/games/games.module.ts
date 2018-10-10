import { NgModule } from '@angular/core';

import { SharedUIModule } from '../shared/ui/shared-ui.module';
import { DialogNewGameComponent } from './dialog-new-game/dialog-new-game.component';
import { GamesComponent } from './games.component';
import { GamesService } from './games.service';
import { ListGamesComponent } from './list-games/list-games.component';

@NgModule({
  imports: [
    SharedUIModule
  ],
  declarations: [
    GamesComponent,
    DialogNewGameComponent,
    ListGamesComponent
  ],
  entryComponents: [
    DialogNewGameComponent
  ],
  providers: [
    GamesService
  ],
  exports: [
    GamesComponent
  ]
})
export class GamesModule { }

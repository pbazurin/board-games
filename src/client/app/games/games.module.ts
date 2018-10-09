import { NgModule } from '@angular/core';

import { SharedUIModule } from '../shared/ui/shared-ui.module';
import { DialogNewGameComponent } from './dialog-new-game/dialog-new-game.component';
import { GamesComponent } from './games.component';

@NgModule({
  imports: [
    SharedUIModule
  ],
  declarations: [
    GamesComponent,
    DialogNewGameComponent
  ],
  entryComponents: [
    DialogNewGameComponent
  ],
  exports: [
    GamesComponent
  ]
})
export class GamesModule { }

import { NgModule } from '@angular/core';

import { SharedUIModule } from '../../shared/ui/shared-ui.module';
import { GameMunchkinComponent } from './game-munchkin.component';

@NgModule({
  imports: [
    SharedUIModule
  ],
  declarations: [
    GameMunchkinComponent
  ],
  entryComponents: [
    GameMunchkinComponent
  ],
  exports: [
    GameMunchkinComponent
  ]
})
export class GameMunchkinModule { }

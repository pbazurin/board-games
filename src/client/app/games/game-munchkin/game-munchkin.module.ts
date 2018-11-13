import { NgModule } from '@angular/core';

import { SharedUIModule } from '../../shared/ui/shared-ui.module';
import { GameMunchkinComponent } from './game-munchkin.component';
import { GameMunchkinService } from './game-munchkin.service';

@NgModule({
  imports: [
    SharedUIModule
  ],
  declarations: [
    GameMunchkinComponent
  ],
  providers: [
    GameMunchkinService
  ],
  entryComponents: [
    GameMunchkinComponent
  ],
  exports: [
    GameMunchkinComponent
  ]
})
export class GameMunchkinModule { }

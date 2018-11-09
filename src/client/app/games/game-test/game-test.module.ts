import { NgModule } from '@angular/core';

import { SharedUIModule } from '../../shared/ui/shared-ui.module';
import { GameTestComponent } from './game-test.component';

@NgModule({
  imports: [
    SharedUIModule
  ],
  declarations: [
    GameTestComponent
  ],
  entryComponents: [
    GameTestComponent
  ],
  exports: [
    GameTestComponent
  ]
})
export class GameTestModule { }

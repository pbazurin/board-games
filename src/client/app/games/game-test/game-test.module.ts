import { NgModule } from '@angular/core';

import { SharedUIModule } from '../../shared/ui/shared-ui.module';
import { GameTestComponent } from './game-test.component';
import { GameTestService } from './game-test.service';

@NgModule({
  imports: [
    SharedUIModule
  ],
  declarations: [
    GameTestComponent
  ],
  providers: [
    GameTestService
  ],
  entryComponents: [
    GameTestComponent
  ],
  exports: [
    GameTestComponent
  ]
})
export class GameTestModule { }

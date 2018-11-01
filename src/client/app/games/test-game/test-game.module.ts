import { NgModule } from '@angular/core';

import { SharedUIModule } from '../../shared/ui/shared-ui.module';
import { TestGameComponent } from './test-game.component';

@NgModule({
  imports: [
    SharedUIModule
  ],
  declarations: [
    TestGameComponent
  ],
  entryComponents: [
    TestGameComponent
  ],
  exports: [
    TestGameComponent
  ]
})
export class TestGameModule { }

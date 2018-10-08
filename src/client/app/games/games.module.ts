import { NgModule } from '@angular/core';

import { SharedUIModule } from '../shared/ui/shared-ui.module';
import { GamesComponent } from './games.component';

@NgModule({
  imports: [
    SharedUIModule
  ],
  declarations: [
    GamesComponent
  ],
  exports: [
    GamesComponent
  ]
})
export class GamesModule { }

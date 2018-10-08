import { NgModule } from '@angular/core';

import { SharedUIModule } from '../shared/ui/shared-ui.module';
import { AboutComponent } from './about.component';

@NgModule({
  imports: [
    SharedUIModule
  ],
  declarations: [
    AboutComponent
  ],
  exports: [
    AboutComponent
  ]
})
export class AboutModule { }

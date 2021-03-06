import { NgModule } from '@angular/core';

import { SharedUIModule } from '../shared/shared-ui.module';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [SharedUIModule],
  declarations: [HomeComponent],
  exports: [HomeComponent]
})
export class HomeModule {}

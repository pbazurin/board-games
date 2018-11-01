import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedUIModule } from '../shared/ui/shared-ui.module';
import { DialogAboutComponent } from './dialog-about/dialog-about.component';
import { DialogUserSettingsComponent } from './dialog-user-settings/dialog-user-settings.component';
import { HeaderComponent } from './header.component';

@NgModule({
  imports: [
    SharedUIModule,
    RouterModule
  ],
  declarations: [
    HeaderComponent,
    DialogUserSettingsComponent,
    DialogAboutComponent
  ],
  entryComponents: [
    DialogUserSettingsComponent,
    DialogAboutComponent
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }

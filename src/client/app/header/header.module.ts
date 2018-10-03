import { NgModule } from '@angular/core';

import { SharedUIModule } from '../shared/ui/shared-ui.module';
import { DialogUserSettings } from './dialog-user-settings/dialog-user-settings.component';
import { HeaderComponent } from './header.component';

@NgModule({
  imports: [
    SharedUIModule
  ],
  declarations: [
    HeaderComponent,
    DialogUserSettings
  ],
  entryComponents: [DialogUserSettings],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }

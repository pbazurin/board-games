import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';

import { DialogAboutComponent } from './dialog-about/dialog-about.component';
import { DialogUserSettingsComponent } from './dialog-user-settings/dialog-user-settings.component';

@Component({
  selector: 'bg-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private dialog: MatDialog) {}

  openUserSettingsDialog() {
    this.dialog.open(DialogUserSettingsComponent, { width: '400px' });
  }

  openAboutDialog() {
    this.dialog.open(DialogAboutComponent, { width: '500px' });
  }
}

import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';

import { DialogUserSettings } from './dialog-user-settings/dialog-user-settings.component';

@Component({
  selector: 'bg-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(public dialog: MatDialog) { }

  openUserSettingsDialog() {
    this.dialog.open(DialogUserSettings);
  }
}

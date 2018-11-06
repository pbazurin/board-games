import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { take } from 'rxjs/operators';

import { UserSettings, UserSettingsService } from '../../core/services/user-settings.service';

@Component({
  selector: 'bg-dialog-user-settings',
  templateUrl: 'dialog-user-settings.component.html'
})
export class DialogUserSettingsComponent implements OnInit {
  languageNames = {
    'en': 'English',
    'ru': 'Русский',
    'ua': 'Українська'
  };
  settings: UserSettings;

  constructor(
    private dialogRef: MatDialogRef<DialogUserSettingsComponent>,
    private userSettingsService: UserSettingsService
  ) { }

  ngOnInit() {
    this.userSettingsService.userSettings$.pipe(take(1))
      .subscribe(settings => this.settings = { ...settings });
  }

  onSubmit() {
    this.userSettingsService.update(this.settings);

    this.dialogRef.close();
  }
}

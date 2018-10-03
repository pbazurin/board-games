import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { select, Store } from '@ngrx/store';

import { take } from 'rxjs/operators';

import { GlobalState, UserSettings } from '../../store';
import { UserSettingsChangeAction } from '../../store/app/user-settings/user-settings.actions';
import { getUserSettings } from '../../store/app/user-settings/user-settings.reducer';

@Component({
  selector: 'bg-dialog-user-settings',
  templateUrl: 'dialog-user-settings.component.html'
})
export class DialogUserSettings implements OnInit {
  languageNames = {
    'en': 'English',
    'ru': 'Русский',
    'ua': 'Українська'
  };
  settings: UserSettings;

  constructor(
    private store: Store<GlobalState>,
    private dialogRef: MatDialogRef<DialogUserSettings>
  ) { }

  ngOnInit() {
    this.store.pipe(select(getUserSettings), take(1))
      .subscribe(settings => this.settings = { ...settings });
  }

  onSubmit() {
    this.store.dispatch(new UserSettingsChangeAction(this.settings));

    this.dialogRef.close();
  }
}

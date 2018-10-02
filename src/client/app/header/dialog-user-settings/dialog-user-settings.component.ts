import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { select, Store } from '@ngrx/store';

import { take } from 'rxjs/operators';

import { GlobalState, UserSettings } from '../../store';
import { UserLanguageChangeAction, UserNameChangeAction, UserSecretChangeAction } from '../../store/app/app.actions';
import { getUserSettings } from '../../store/app/app.reducer';

@Component({
  selector: 'bg-dialog-user-settings',
  templateUrl: 'dialog-user-settings.component.html'
})
export class DialogUserSettings implements OnInit {
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
    // TODO: use single action
    this.store.dispatch(new UserNameChangeAction(this.settings.name));
    this.store.dispatch(new UserSecretChangeAction(this.settings.secret));
    this.store.dispatch(new UserLanguageChangeAction(this.settings.language));

    this.dialogRef.close();
  }
}

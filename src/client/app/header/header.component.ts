import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Store } from '@ngrx/store';

import { GlobalState } from '../store';
import { getUserName } from '../store/app/user-settings/user-settings.reducer';
import { DialogUserSettings } from './dialog-user-settings/dialog-user-settings.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'bg-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userName$: Observable<string>;

  constructor(
    private dialog: MatDialog,
    private store: Store<GlobalState>
  ) { }

  ngOnInit() {
    this.userName$ = this.store.select(getUserName);
  }

  openUserSettingsDialog() {
    this.dialog.open(DialogUserSettings, { width: '300px' });
  }
}

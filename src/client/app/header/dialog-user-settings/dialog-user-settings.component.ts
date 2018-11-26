import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { take } from 'rxjs/operators';

import { UserDataChangedAction, UserDataChangedPayload } from '@dto/user/user-actions';
import { UserDto } from '@dto/user/user.dto';

import { SocketService } from '../../core/services/socket.service';
import { UserSettings, UserSettingsService } from '../../core/services/user-settings.service';

@Component({
  selector: 'bg-dialog-user-settings',
  templateUrl: 'dialog-user-settings.component.html'
})
export class DialogUserSettingsComponent implements OnInit {
  languageNames = {
    en: 'English',
    ru: 'Русский',
    ua: 'Українська'
  };
  currentSettings: UserSettings;

  private oldSettings: UserSettings;

  constructor(
    private dialogRef: MatDialogRef<DialogUserSettingsComponent>,
    private userSettingsService: UserSettingsService,
    private socketService: SocketService
  ) {}

  ngOnInit() {
    this.userSettingsService.userSettings$.pipe(take(1)).subscribe(settings => {
      this.oldSettings = { ...settings };
      this.currentSettings = { ...settings };
    });
  }

  onSubmit() {
    const updatedSettings = this.userSettingsService.update(
      this.currentSettings
    );

    const payload = <UserDataChangedPayload>{
      oldValue: <UserDto>{
        id: this.oldSettings.id,
        name: this.oldSettings.name,
        language: this.oldSettings.language
      },
      newValue: <UserDto>{
        id: updatedSettings.id,
        name: updatedSettings.name,
        language: updatedSettings.language
      },
      password: updatedSettings.password
    };
    this.socketService.emit(new UserDataChangedAction(payload));

    this.dialogRef.close();
  }
}

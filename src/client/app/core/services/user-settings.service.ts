import { Injectable } from '@angular/core';

import { Observable, ReplaySubject } from 'rxjs';

import { sha256 } from 'js-sha256';
import { v4 } from 'uuid';

import { environment } from '../../../environments/environment';
import { generateRandomName } from '../../shared/unique-names-generator/unique-names-generator';
import { Utils } from '../../utils/utils';

export interface UserSettings {
  id: string;
  name: string;
  password: string;
  language: string;
  availableLanguages: string[];
}

@Injectable()
export class UserSettingsService {
  private USER_SETTINGS_STORAGE_NAME = 'userSettings';
  private userSettingsSubject$ = new ReplaySubject<UserSettings>(1);

  get userSettings$(): Observable<UserSettings> {
    return this.userSettingsSubject$.asObservable();
  }

  constructor() {}

  init() {
    let userSettings = this.loadFromStorage();

    if (!userSettings) {
      userSettings = this.generateNew();

      this.saveToStorage(userSettings);
    }

    this.userSettingsSubject$.next(userSettings);
  }

  update(newUserSettings: UserSettings): UserSettings {
    const userSettings = {
      ...newUserSettings,
      id: sha256(newUserSettings.password)
    };

    this.saveToStorage(userSettings);

    this.userSettingsSubject$.next(userSettings);

    return userSettings;
  }

  private loadFromStorage(): UserSettings {
    const userSettingsString = localStorage.getItem(
      this.USER_SETTINGS_STORAGE_NAME
    );

    if (!userSettingsString || !userSettingsString.length) {
      return null;
    }

    let userSettings;

    try {
      userSettings = <UserSettings>(JSON.parse(userSettingsString) || {});
    } catch {
      return null;
    }

    if (
      !userSettings.name ||
      !userSettings.password ||
      !userSettings.id ||
      !userSettings.language
    ) {
      return null;
    }

    userSettings.availableLanguages = environment.supportedLanguages;

    return userSettings;
  }

  private generateNew(): UserSettings {
    const userSettings = <UserSettings>{
      name: Utils.capitalizeString(generateRandomName(' ')),
      password: v4().replace(/-/g, ''),
      availableLanguages: environment.supportedLanguages,
      language: environment.supportedLanguages[0]
    };

    userSettings.id = sha256(userSettings.password);

    return userSettings;
  }

  private saveToStorage(userSettings: UserSettings) {
    localStorage.setItem(
      this.USER_SETTINGS_STORAGE_NAME,
      JSON.stringify(userSettings)
    );
  }
}

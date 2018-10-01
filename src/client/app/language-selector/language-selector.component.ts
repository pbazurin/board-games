import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { UserSettings } from '../store';
import { UserLanguageChangeAction } from '../store/app/app.actions';
import { getUserAvailableLanguages, getUserLanguage } from '../store/app/app.reducer';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'bg-language-selector',
  templateUrl: './language-selector.component.html'
})
export class LanguageSelectorComponent implements OnInit, OnDestroy {
  availableLanguages$: Observable<string[]>;
  currentLanguage: string;

  private subscriptions: Subscription[] = [];

  constructor(
    private store: Store<UserSettings>
  ) { }

  ngOnInit() {
    this.availableLanguages$ = this.store.select(getUserAvailableLanguages);

    this.subscriptions.push(this.store.select(getUserLanguage)
      .subscribe(lang => this.currentLanguage = lang));
  }

  languageChanged(selectedItem: string): void {
    this.store.dispatch(new UserLanguageChangeAction(selectedItem));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}

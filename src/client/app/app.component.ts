import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { TranslateService } from '@ngx-translate/core';

import { SharedModel } from '../../shared/shared.model';
import { environment } from '../environments/environment';
import { AppState } from './store';
import { AppInitializeAction } from './store/app.actions';

@Component({
  selector: 'bg-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title: string;

  constructor(
    translate: TranslateService,
    private store: Store<AppState>
  ) {
    translate.addLangs(environment.supportedLanguages)
    translate.setDefaultLang('en');
    translate.use('en');
  }

  ngOnInit() {
    this.store.dispatch(new AppInitializeAction());

    const sharedModel = <SharedModel>{
      test: 'ta-ta'
    };

    this.title = sharedModel.test;
  }
}

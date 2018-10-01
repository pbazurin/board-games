import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { SharedModel } from '../../shared/shared.model';
import { AppState } from './store';
import { AppInitializeAction } from './store/app/app.actions';

@Component({
  selector: 'bg-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title: string;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.store.dispatch(new AppInitializeAction());

    const sharedModel = <SharedModel>{
      test: 'ta-ta'
    };

    this.title = sharedModel.test;
  }
}

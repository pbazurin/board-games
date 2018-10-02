import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

import { Store } from '@ngrx/store';

import { SharedModel } from '../../shared/shared.model';
import { GlobalState } from './store';
import { AppInitializeAction } from './store/app/app.actions';

@Component({
  selector: 'bg-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title: string;

  constructor(
    private store: Store<GlobalState>,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.matIconRegistry.addSvgIconSet(this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/svg/sprite.svg'));

    this.store.dispatch(new AppInitializeAction());

    const sharedModel = <SharedModel>{
      test: 'ta-ta'
    };

    this.title = sharedModel.test;
  }
}

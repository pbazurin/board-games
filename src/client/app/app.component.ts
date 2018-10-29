import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

import { Store } from '@ngrx/store';

import { GlobalState } from './store';
import { AppInitializeAction } from './store/app/app.actions';
import { Angulartics2GoogleGlobalSiteTag } from 'angulartics2/gst';

@Component({
  selector: 'bg-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private store: Store<GlobalState>,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    angulartics: Angulartics2GoogleGlobalSiteTag
  ) {
    angulartics.startTracking();
  }

  ngOnInit() {
    this.matIconRegistry.addSvgIconSet(this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/svg/sprite.svg'));

    this.store.dispatch(new AppInitializeAction());
  }
}

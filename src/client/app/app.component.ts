import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

import { Store } from '@ngrx/store';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { TranslateService } from '@ngx-translate/core';

import { environment } from '../environments/environment';
import { SocketToStoreService } from './core/services/socket-to-store.service';
import { GlobalState } from './store';
import { UserSettingsLoadAction } from './store/app/user-settings/user-settings.actions';
import { Angulartics2GoogleGlobalSiteTag } from 'angulartics2/gst';

@Component({
  selector: 'bg-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private tearDown$ = new Subject();

  constructor(
    store: Store<GlobalState>,
    matIconRegistry: MatIconRegistry,
    domSanitizer: DomSanitizer,
    translate: TranslateService,
    angulartics: Angulartics2GoogleGlobalSiteTag,
    socketToStoreService: SocketToStoreService
  ) {
    angulartics.startTracking();
    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('./assets/svg/sprite.svg'));
    translate.setDefaultLang(environment.supportedLanguages[0]);

    socketToStoreService.sendAllSocketEventsToStore()
      .pipe(takeUntil(this.tearDown$))
      .subscribe();

    store.dispatch(new UserSettingsLoadAction());
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.tearDown$.next();
    this.tearDown$.complete();
  }
}

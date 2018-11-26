import { Component, OnDestroy } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

import { Subject } from 'rxjs';
import { distinctUntilChanged, map, take, takeUntil } from 'rxjs/operators';

import { TranslateService } from '@ngx-translate/core';
import { Angulartics2GoogleGlobalSiteTag } from 'angulartics2/gst';

import { ErrorResponseAction } from '@dto/error/error.actions';
import { UserRequestConnectionAction } from '@dto/user/user-actions';

import { environment } from '../environments/environment';
import { AuthService } from './core/services/auth.service';
import { NotificationService } from './core/services/notification.service';
import { SocketService } from './core/services/socket.service';
import { UserSettingsService } from './core/services/user-settings.service';

@Component({
  selector: 'bg-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  private tearDown$ = new Subject();

  constructor(
    matIconRegistry: MatIconRegistry,
    domSanitizer: DomSanitizer,
    translate: TranslateService,
    angulartics: Angulartics2GoogleGlobalSiteTag,
    userSettingsService: UserSettingsService,
    socketService: SocketService,
    authService: AuthService,
    notificationService: NotificationService
  ) {
    angulartics.startTracking();
    matIconRegistry.addSvgIconSet(
      domSanitizer.bypassSecurityTrustResourceUrl('./assets/svg/sprite.svg')
    );

    socketService.init();
    authService
      .init()
      .pipe(takeUntil(this.tearDown$))
      .subscribe();
    userSettingsService.init();

    translate.setDefaultLang(environment.supportedLanguages[0]);
    userSettingsService.userSettings$
      .pipe(
        takeUntil(this.tearDown$),
        take(1)
      )
      .subscribe(userSettings => {
        translate.addLangs(userSettings.availableLanguages);
        translate.use(userSettings.language);

        socketService.emit(
          new UserRequestConnectionAction({
            user: {
              id: userSettings.id,
              name: userSettings.name,
              language: userSettings.language
            },
            password: userSettings.password
          })
        );
      });
    userSettingsService.userSettings$
      .pipe(
        takeUntil(this.tearDown$),
        map(s => s.language),
        distinctUntilChanged()
      )
      .subscribe(selectedLanguage => translate.use(selectedLanguage));

    socketService
      .listen(ErrorResponseAction)
      .pipe(takeUntil(this.tearDown$))
      .subscribe(action => notificationService.showMessage(action.payload));

    socketService
      .listenAll()
      .pipe(takeUntil(this.tearDown$))
      .subscribe(action =>
        console.log(`${action.type} ${JSON.stringify(action.payload)}`)
      );
  }

  ngOnDestroy() {
    this.tearDown$.next();
    this.tearDown$.complete();
  }
}

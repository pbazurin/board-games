import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { Angulartics2Module } from 'angulartics2';

import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { CustomErrorHandler } from './core/error/custom-error-handler';
import { rollbarFactory, RollbarService } from './core/error/rollbar';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { TokenInterceptor } from './core/interceptors/token.interceptor';
import { AuthService } from './core/services/auth.service';
import { NotificationService } from './core/services/notification.service';
import { SocketService } from './core/services/socket.service';
import { TranslateLoaderService } from './core/services/translate-loader.service';
import { UserSettingsService } from './core/services/user-settings.service';
import { GamesModule } from './games/games.module';
import { HeaderModule } from './header/header.module';
import { HomeModule } from './home/home.module';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSnackBarModule,

    RouterModule.forRoot(appRoutes),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: TranslateLoaderService
      }
    }),
    Angulartics2Module.forRoot(),
    HeaderModule,
    HomeModule,
    GamesModule
  ],
  declarations: [AppComponent],
  providers: [
    AuthService,
    SocketService,
    NotificationService,
    UserSettingsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    {
      provide: ErrorHandler,
      useClass: CustomErrorHandler
    },
    {
      provide: RollbarService,
      useFactory: rollbarFactory
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

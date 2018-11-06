import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { Angulartics2Module } from 'angulartics2';

import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { CoreModule } from './core/core.module';
import { GamesModule } from './games/games.module';
import { HeaderModule } from './header/header.module';
import { HomeModule } from './home/home.module';
import { CustomErrorHandler } from './shared/error/custom-error-handler';
import { rollbarFactory, RollbarService } from './shared/error/rollbar';
import { TranslateLoaderService } from './shared/services/translate-loader.service';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    CoreModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: TranslateLoaderService,
      }
    }),
    Angulartics2Module.forRoot(),
    HeaderModule,
    HomeModule,
    GamesModule
  ],
  declarations: [AppComponent],
  providers: [
    {
      provide: ErrorHandler,
      useClass: CustomErrorHandler,
    },
    {
      provide: RollbarService,
      useFactory: rollbarFactory
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

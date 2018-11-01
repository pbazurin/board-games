import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { EffectsModule } from '@ngrx/effects';
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { CoreModule } from './core/core.module';
import { GamesModule } from './games/games.module';
import { HeaderModule } from './header/header.module';
import { HomeModule } from './home/home.module';
import { CustomErrorHandler } from './shared/error/custom-error-handler';
import { rollbarFactory, RollbarService } from './shared/error/rollbar';
import { TranslateLoaderService } from './shared/services/translate-loader.service';
import { CustomRouterStateSerializer, metaReducers, reducers } from './store';
import { effects } from './store/effects';
import { Angulartics2Module } from 'angulartics2';

const storeDevtools = !environment.production ? [StoreDevtoolsModule.instrument()] : [];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    /**
     * StoreModule.forRoot is imported once in the root module, accepting a reducer
     * function or object map of reducer functions. If passed an object of
     * reducers, combineReducers will be run creating your application
     * meta-reducer. This returns all providers for an @ngrx/store
     * based application.
     */
    StoreModule.forRoot(reducers, { metaReducers }),
    ...storeDevtools,
    // StoreModule.forFeature(AppInitFeatureName, AppInitReducer),
    /**
     * @ngrx/router-store keeps router state up-to-date in the store.
     */
    StoreRouterConnectingModule,
    /**
     * EffectsModule.forRoot() is imported once in the root module and
     * sets up the effects class to be initialized immediately when the
     * application starts.
     *
     * See: https://github.com/ngrx/platform/blob/master/docs/effects/api.md#forroot
     */
    EffectsModule.forRoot(effects),
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
    /**
     * The `RouterStateSnapshot` provided by the `Router` is a large complex structure.
     * A custom RouterStateSerializer is used to parse the `RouterStateSnapshot` provided
     * by `@ngrx/router-store` to include only the desired pieces of the snapshot.
     */
    {
      provide: RouterStateSerializer,
      useClass: CustomRouterStateSerializer,
    },
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

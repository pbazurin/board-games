import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';

import { SharedUIModule } from '../shared/ui/shared-ui.module';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { AuthService } from './services/auth.service';
import { SocketService } from './services/socket.service';
import { UserSettingsService } from './services/user-settings.service';

@NgModule({
  declarations: [],
  exports: [],
  imports: [
    HttpClientModule,
    SharedUIModule
  ],
  providers: [],
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        AuthService,
        SocketService,
        UserSettingsService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptor,
          multi: true
        }
      ],
    };
  }

  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    this.throwExceptionIfItisAlreadyLoaded(parentModule);
  }

  private throwExceptionIfItisAlreadyLoaded(parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}

import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';

import { SharedUIModule } from '../shared/ui/shared-ui.module';
import { SocketToStoreService } from './services/socket-to-store.service';
import { SocketService } from './services/socket.service';

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
        SocketService,
        SocketToStoreService
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

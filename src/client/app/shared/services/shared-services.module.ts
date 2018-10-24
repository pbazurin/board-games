import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';

import { TranslateLoaderService } from './translate-loader.service';

@NgModule({
  imports: [StoreModule],
  exports: [],
  declarations: [],
  providers: [
    TranslateLoaderService
  ],
})
export class SharedServicesModule { }

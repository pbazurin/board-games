import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

@Injectable()
export class TranslateLoaderService implements TranslateLoader {
  private readonly PREFIX = './assets/i18n/';
  private readonly SUFFIX = '.json';
  private translateHttpLoader: TranslateHttpLoader;

  constructor(
    http: HttpClient
  ) {
    this.translateHttpLoader = new TranslateHttpLoader(http, this.PREFIX, this.SUFFIX);
  }

  getTranslation(lang: string): Observable<any> {
    return this.translateHttpLoader.getTranslation(lang);
  }
}

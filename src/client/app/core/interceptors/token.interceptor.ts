import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';

import { getConnectionId } from '../../store/app/user-settings/user-settings.reducer';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public store: Store<any>) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!request.url.startsWith(`api/`)) {
      return next.handle(request);
    }

    return this.store
      .pipe(
        select(getConnectionId),
        filter(id => !!id),
        take(1),
        switchMap(connectionId => {
          request = request.clone({
            setHeaders: {
              Authorization: `Custom ${connectionId}`
            }
          });

          return next.handle(request);
        })
      );
  }
}

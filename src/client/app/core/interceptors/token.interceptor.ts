import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!request.url.startsWith(`api/`)) {
      return next.handle(request);
    }

    return this.authService.connectionId$.pipe(
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

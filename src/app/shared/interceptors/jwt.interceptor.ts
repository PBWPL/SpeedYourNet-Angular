import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { LoaderInterceptor } from './loader.interceptor';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    public loaderService: LoaderInterceptor
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loaderService.isLoading.next(true);
    let headers = {
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
    };

    const user = this.authService.userValue;
    if (user && user.token) {
      headers['Authorization'] = `Bearer ${user.token}`;
    }

    req = req.clone({
      setHeaders: headers,
    });

    return next.handle(req).pipe(
      finalize(() => {
        this.loaderService.isLoading.next(false);
      })
    );
  }
}

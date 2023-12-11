import { Inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(
    @Inject('API_URL') private API_URL: string,
    private store: Store
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const newRequest = request.clone({
      url: this.API_URL.concat(request.url),
      // params: request.params.set('key', this.token),
    });

    return next.handle(newRequest);
  }
}

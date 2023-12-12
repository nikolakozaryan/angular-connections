import {
  HttpEvent,
  HttpHandler, HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import {selectAuthState, selectIsAuthorized} from "@auth/store/auth.selectors";
import { Store } from "@ngrx/store";
import {map, Observable, of, switchMap} from "rxjs";

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(
    @Inject("API_URL") private API_URL: string,
    private store: Store
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return this.store.select(selectIsAuthorized).pipe(switchMap((isAuthorized) => {
      return isAuthorized ? this.store.select(selectAuthState) : of(null);
    }), switchMap(authCreds => {
      const headers = authCreds ? new HttpHeaders( {
        Authorization: `Bearer ${authCreds.token}`,
        'rs-uid': authCreds.uid,
        'rs-email': authCreds.uid
      }): null;

      const newRequest = request.clone({
        url: this.API_URL.concat(request.url),

// params: request.params.set('key', this.token),
      });

      return next.handle(newRequest);
    }))
}



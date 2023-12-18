import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import {
  selectAuthState,
} from "@auth/store/auth.selectors";
import { Store } from "@ngrx/store";
import { Observable, switchMap, take } from "rxjs";

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
    return this.store.select(selectAuthState).pipe(
      take(1),
      switchMap((authCreds) => {
        const { uid, email, token } = authCreds;
        const headers = uid && email && token
          ? new HttpHeaders({
            Authorization: `Bearer ${authCreds.token}`,
            "rs-uid": authCreds.uid,
            "rs-email": authCreds.email,
          })
          : undefined;

        const newRequest = request.clone({
          url: this.API_URL.concat(request.url),
          headers,
        });

        return next.handle(newRequest);
      })
    );
  }
}

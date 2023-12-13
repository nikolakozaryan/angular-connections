import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";
import { ApplicationConfig, isDevMode } from "@angular/core";
import { provideRouter } from "@angular/router";
import AuthEffects from "@auth/store/auth.effects";
import authReducer from "@auth/store/auth.reducer";
import { HttpRequestInterceptor } from "@core/interceptors/http-request.interceptor";
import { provideEffects } from "@ngrx/effects";
import { provideStore } from "@ngrx/store";
import { provideStoreDevtools } from "@ngrx/store-devtools";

import { routes } from "./app.routes";
import ProfileEffects from "./profile/store/profile.effects";
import profileReducer from "./profile/store/profile.reducer";

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(routes),
    provideStore({ auth: authReducer, profile: profileReducer }),
    provideEffects(AuthEffects, ProfileEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    { provide: "API_URL", useValue: "https://tasks.app.rs.school/angular/" },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true,
    },
  ],
};

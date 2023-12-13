import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "@auth/services/auth.service";
import ROUTES from "@core/models/enums/routes.enum";
import { ToastService, ToastState } from "@core/services/toast.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import {
  catchError, map, of, switchMap
} from "rxjs";

import {
  logoutFailed,
  logoutStart,
  logoutSuccess,
  signinFailed,
  signinStart,
  signinSuccess,
  signupFailed,
  signupStart,
  signupSuccess,
} from "./auth.actions";

@Injectable()
export default class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {}

  public signup$ = createEffect(() => this.actions$.pipe(
    ofType(signupStart),
    switchMap((formData) => this.authService.signup(formData).pipe(
      map(() => {
        this.toastService.showToast(ToastState.success, "Success!");
        this.router.navigate([ROUTES.Signin]);
        return signupSuccess();
      }),
      catchError((err: HttpErrorResponse) => {
        this.toastService.showToast(
          ToastState.error,
          `Failed! ${err.error.message}`
        );

        return of(signupFailed({ errorType: err.error.type }));
      })
    ))
  ));

  public signin$ = createEffect(() => this.actions$.pipe(
    ofType(signinStart),
    switchMap((formData) => this.authService.signin(formData).pipe(
      map((data) => {
        const { email } = formData;
        this.toastService.showToast(ToastState.success, "Success!");
        this.router.navigate([ROUTES.Profile]);
        return signinSuccess({ ...data, email });
      }),
      catchError((err: HttpErrorResponse) => {
        const {
          error: { message, type },
        } = err;
        this.toastService.showToast(ToastState.error, `Failed! ${message}`);

        return of(signinFailed({ errorType: type }));
      })
    ))
  ));

  public logout$ = createEffect(() => this.actions$.pipe(
    ofType(logoutStart),
    switchMap(() => this.authService.logout().pipe(
      map(() => {
        this.toastService.showToast(ToastState.success, "Success!");
        localStorage.clear();
        this.router.navigate([ROUTES.Signin]);
        return logoutSuccess();
      }),
      catchError((err: HttpErrorResponse) => {
        const {
          error: { message },
        } = err;
        this.toastService.showToast(ToastState.error, `Failed! ${message}`);

        return of(logoutFailed());
      })
    ))
  ));
}

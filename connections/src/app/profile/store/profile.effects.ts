import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "@auth/services/auth.service";
import ROUTES from "@core/models/enums/routes.enum";
import { TOAST_STATE, ToastService } from "@core/services/toast.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import {
  catchError, map, of, switchMap
} from "rxjs";

import {
  signinFailed,
  signinStart,
  signinSuccess,
  signupFailed,
  signupStart,
  signupSuccess,
} from "./profile.actions";

@Injectable()
export default class ProfileEffects {
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
        this.toastService.showToast(TOAST_STATE.success, "Success!");
        this.router.navigate([ROUTES.Signin]);
        return signupSuccess();
      }),
      catchError((err: HttpErrorResponse) => {
        this.toastService.showToast(
          TOAST_STATE.error,
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
        this.toastService.showToast(TOAST_STATE.success, "Success!");
        this.router.navigate([ROUTES.Profile]);
        return signinSuccess({ ...data, email });
      }),
      catchError((err: HttpErrorResponse) => {
        const {
          error: { message, type },
        } = err;
        this.toastService.showToast(
          TOAST_STATE.error,
          `Failed! ${message}`
        );

        return of(signinFailed({ errorType: type }));
      })
    ))
  ));
}

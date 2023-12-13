import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ToastService, ToastState } from "@core/services/toast.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import {
  catchError, map, of, switchMap, withLatestFrom
} from "rxjs";

import { GetProfileResponseDTO } from "../core/interfaces/get-profile.dto";
import { ProfileService } from "../services/profile.service";
import {
  editProfileFailed,
  editProfileStart,
  editProfileSuccess,
  getProfileFailed,
  getProfileStart,
  getProfileSuccess,
} from "./profile.actions";
import { selectProfileState } from "./profile.selectors";

@Injectable()
export default class ProfileEffects {
  constructor(
    private actions$: Actions,
    private profileService: ProfileService,
    private toastService: ToastService,
    private store: Store
  ) {}

  public getProfile$ = createEffect(() => this.actions$.pipe(
    ofType(getProfileStart),
    withLatestFrom(this.store.select(selectProfileState)),
    switchMap(([, profileState]) => {
      const {
        email, uid, name, createdAt
      } = profileState;
      return email && uid && name && createdAt
        ? of(
          getProfileSuccess({
            email,
            uid,
            name,
            createdAt,
          })
        )
        : this.profileService.getProfile().pipe(
          map((data) => {
            this.toastService.showToast(ToastState.success, "Success!");

            const transformed: GetProfileResponseDTO = {
              createdAt: data.createdAt.S,
              email: data.email.S,
              name: data.name.S,
              uid: data.uid.S,
            };

            return getProfileSuccess(transformed);
          }),
          catchError((err: HttpErrorResponse) => {
            this.toastService.showToast(
              ToastState.error,
              `Failed! ${err.error.message}`
            );

            return of(getProfileFailed({ errorType: err.error.type }));
          })
        );
    })
  ));

  public editProfile$ = createEffect(() => this.actions$.pipe(
    ofType(editProfileStart),
    switchMap(({ name }) => this.profileService.editProfile(name).pipe(
      map(() => {
        this.toastService.showToast(ToastState.success, "Success!");

        return editProfileSuccess({ name });
      }),
      catchError((err: HttpErrorResponse) => {
        this.toastService.showToast(
          ToastState.error,
          `Failed! ${err.error.message}`
        );

        return of(editProfileFailed({ errorType: err.error.type }));
      })
    ))
  ));
}

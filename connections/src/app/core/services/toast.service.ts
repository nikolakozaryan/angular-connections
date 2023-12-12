import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export enum TOAST_STATE {
  success = "toast-success",
  error = "toast-error",
}

@Injectable({
  providedIn: "root",
})
export class ToastService {
  private timeout: ReturnType<typeof setTimeout>;
  public showsToast$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  // The message string that'll bind and display on the toast  ﻿.
  public toastMessage$: BehaviorSubject<string> = new BehaviorSubject<string>(
    "Default Toast Message"
  );

  // The state that will add a style class to the component  ﻿.
  public toastState$: BehaviorSubject<string> = new BehaviorSubject<string>(
    TOAST_STATE.success
  );

  showToast(toastState: TOAST_STATE, toastMsg: string): void {
    this.toastState$.next(toastState);
    this.toastMessage$.next(toastMsg);
    this.showsToast$.next(true);

    this.timeout = setTimeout(() => {
      this.dismissToast();
    }, 3000);
  }

  dismissToast(): void {
    clearTimeout(this.timeout);
    this.showsToast$.next(false);
  }
}

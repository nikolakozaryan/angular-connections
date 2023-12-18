import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export enum ToastState {
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

  public toastMessage$: BehaviorSubject<string> = new BehaviorSubject<string>(
    "Default Toast Message"
  );

  public toastState$: BehaviorSubject<string> = new BehaviorSubject<string>(
    ToastState.success
  );

  showToast(toastState: ToastState, toastMsg: string): void {
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

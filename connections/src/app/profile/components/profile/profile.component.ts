import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { logoutStart, logoutSuccess } from "@auth/store/auth.actions";
import { selectAuthLoading } from "@auth/store/auth.selectors";
import { nameValidator } from "@auth/validators/name.validator";
import { ButtonComponent } from "@core/components/button/button.component";
import { Destroy } from "@core/models/classes/destroy";
import ROUTES from "@core/models/enums/routes.enum";
import { Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { takeUntil } from "rxjs";

import {
  editProfileStart,
  editProfileSuccess,
  getProfileStart,
} from "../../store/profile.actions";
import {
  selectProfileDate,
  selectProfileEmail,
  selectProfileLoading,
  selectProfileName,
  selectProfileUid,
} from "../../store/profile.selectors";

@Component({
  selector: "app-profile",
  standalone: true,
  imports: [CommonModule, ButtonComponent, ReactiveFormsModule],
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent extends Destroy implements OnInit {
  public email$ = this.store.select(selectProfileEmail);
  public date$ = this.store.select(selectProfileDate);
  public uid$ = this.store.select(selectProfileUid);
  public loadingAuth$ = this.store.select(selectAuthLoading);
  public loadingProfile$ = this.store.select(selectProfileLoading);
  public name = "";
  public formControl: FormControl;
  public isEditMode = false;

  get nameControlValue(): string {
    return this.formControl.value;
  }

  constructor(
    private store: Store,
    private router: Router,
    private actions$: Actions
  ) {
    super();
  }

  ngOnInit() {
    this.store.dispatch(getProfileStart());

    this.store
      .select(selectProfileName)
      .pipe(takeUntil(this.destroy$))
      .subscribe((name) => {
        this.name = name;
      });

    this.actions$
      .pipe(ofType(editProfileSuccess), takeUntil(this.destroy$))
      .subscribe(() => {
        this.isEditMode = false;
      });

    this.actions$
      .pipe(ofType(logoutSuccess), takeUntil(this.destroy$))
      .subscribe(() => {
        this.router.navigate([ROUTES.Signin]);
      });
  }

  onEdit() {
    this.initFormControl();
    this.isEditMode = true;
  }

  onEditCancel() {
    this.isEditMode = false;
  }

  onEditSave() {
    if (this.nameControlValue === this.name) {
      this.isEditMode = false;
      return;
    }

    this.store.dispatch(editProfileStart({ name: this.nameControlValue }));
  }

  initFormControl() {
    this.formControl = new FormControl<string>(this.name, nameValidator());
  }

  logout() {
    this.store.dispatch(logoutStart());
  }
}

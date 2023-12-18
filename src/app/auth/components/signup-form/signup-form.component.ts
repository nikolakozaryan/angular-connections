import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { RouterModule } from "@angular/router";
import { signupFailed, signupStart } from "@auth/store/auth.actions";
import { selectAuthLoading } from "@auth/store/auth.selectors";
import { nameValidator } from "@auth/validators/name.validator";
import { passwordValidator } from "@auth/validators/password.validator";
import { ButtonComponent } from "@core/components/button/button.component";
import { Destroy } from "@core/models/classes/destroy";
import { Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { combineLatest, takeUntil } from "rxjs";

@Component({
  selector: "app-signup-form",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, ButtonComponent],
  templateUrl: "./signup-form.component.html",
  styleUrls: ["./signup-form.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupFormComponent extends Destroy implements OnInit {
  public formGroup: FormGroup;
  public loading$ = this.store.select(selectAuthLoading);
  private usedEmails: string[] = [];

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private actions$: Actions
  ) {
    super();
  }

  get name() {
    return this.formGroup.get("name") as FormControl<string>;
  }
  get email() {
    return this.formGroup.get("email") as FormControl<string>;
  }
  get password() {
    return this.formGroup.get("password") as FormControl<string>;
  }

  ngOnInit(): void {
    this.initForm();

    combineLatest([
      this.actions$.pipe(ofType(signupFailed)),
      this.email.valueChanges,
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([{ errorType }, value]) => {
        if (
          errorType === "PrimaryDuplicationException"
          && this.usedEmails.includes(value)
        ) {
          this.email.setErrors({ duplicatedEmail: true });
        }
      });
  }

  submitForm() {
    this.usedEmails = [...this.usedEmails, this.email.value];
    this.store.dispatch(signupStart(this.formGroup.value));
  }

  private initForm(): void {
    this.formGroup = this.fb.nonNullable.group({
      name: ["", nameValidator()],
      password: ["", passwordValidator()],
      email: ["", [Validators.required, Validators.email]],
    });
  }
}

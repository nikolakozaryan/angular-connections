import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { signinFailed, signinStart } from '@auth/store/auth.actions';
import { selectLoading } from '@auth/store/auth.selectors';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { merge, switchMap, takeUntil } from 'rxjs';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from '@core/components/button/button.component';
import { Destroy } from '@core/models/classes/destroy';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, ButtonComponent],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent extends Destroy {
  public formGroup: FormGroup;
  public loading$ = this.store.select(selectLoading);

  public loginButtonDisabled = false;

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private actions$: Actions
  ) {
    super();
  }

  get email() {
    return this.formGroup.get('email') as FormControl<string>;
  }
  get password() {
    return this.formGroup.get('password') as FormControl<string>;
  }

  ngOnInit(): void {
    this.initForm();

    this.actions$
      .pipe(
        ofType(signinFailed),
        switchMap(({ errorType }) => {
          if (errorType === 'NotFoundException') {
            this.loginButtonDisabled = true;
          }
          return merge(
            this.email.valueChanges,
            this.password.valueChanges
          ).pipe(takeUntil(this.destroy$));
        })
      )
      .subscribe(() => {
        this.loginButtonDisabled = false;
      });
  }

  submitForm() {
    this.store.dispatch(signinStart(this.formGroup.value));
  }

  private initForm(): void {
    this.formGroup = this.fb.nonNullable.group({
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }
}

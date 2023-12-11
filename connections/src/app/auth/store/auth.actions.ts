import { SigninSuccessResponse, SigninDto } from '@auth/models/dto/login.dto';
import SignupDto from '@auth/models/dto/signup.dto';
import { AuthData, AuthError } from '@auth/models/interfaces/auth.interface';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

const source = 'Auth';

export const {
  signupStart,
  signupSuccess,
  signupFailed,
  signinStart,
  signinSuccess,
  signinFailed,
} = createActionGroup({
  source,
  events: {
    signupStart: props<SignupDto>(),
    signupSuccess: emptyProps(),
    signupFailed: props<AuthError>(),
    signinStart: props<SigninDto>(),
    signinSuccess: props<AuthData>(),
    signinFailed: props<AuthError>(),
  },
});

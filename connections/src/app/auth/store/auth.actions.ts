import { SigninDto } from "@auth/models/dto/login.dto";
import SignupDto from "@auth/models/dto/signup.dto";
import {
  ApiErrorResponse,
  AuthData,
} from "@auth/models/interfaces/auth.interface";
import { createActionGroup, emptyProps, props } from "@ngrx/store";

const source = "Auth";

export const {
  signupStart,
  signupSuccess,
  signupFailed,
  signinStart,
  signinSuccess,
  signinFailed,
  logoutStart,
  logoutSuccess,
  logoutFailed,
} = createActionGroup({
  source,
  events: {
    signupStart: props<SignupDto>(),
    signupSuccess: emptyProps(),
    signupFailed: props<ApiErrorResponse>(),
    signinStart: props<SigninDto>(),
    signinSuccess: props<AuthData>(),
    signinFailed: props<ApiErrorResponse>(),
    logoutStart: emptyProps(),
    logoutSuccess: emptyProps(),
    logoutFailed: emptyProps(),
  },
});

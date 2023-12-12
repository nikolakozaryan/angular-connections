import { createReducer, on } from "@ngrx/store";

import {
  signinFailed,
  signinStart,
  signinSuccess,
  signupFailed,
  signupStart,
  signupSuccess,
} from "./auth.actions";

export interface AuthState {
  token: string;
  uid: string;
  email: string;
  loading: boolean;
  errorType: string;
}

const initialState: AuthState = {
  token: localStorage.getItem("token") || "",
  uid: localStorage.getItem("uid") || "",
  email: localStorage.getItem("email") || "",
  loading: false,
  errorType: "",
};

const authReducer = createReducer(
  initialState,
  on(signupStart, (state) => ({ ...state, loading: true })),
  on(signupSuccess, (state) => ({ ...state, loading: false })),
  on(signupFailed, (state, { errorType }) => ({ ...state, errorType, loading: false })),
  on(signinStart, (state) => ({ ...state, loading: true })),
  on(signinSuccess, (state, { token, uid, email }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("uid", uid);
    localStorage.setItem("email", email);
    return {
      ...state, loading: false, token, uid, email
    };
  }),
  on(signinFailed, (state, { errorType }) => ({ ...state, errorType, loading: false }))
);

export default authReducer;

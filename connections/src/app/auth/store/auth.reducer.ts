import { createReducer, on } from '@ngrx/store';
import {
  signinFailed,
  signinStart,
  signinSuccess,
  signupFailed,
  signupStart,
  signupSuccess,
} from './auth.actions';

export interface AuthState {
  token: string;
  uid: string;
  email: string;
  loading: boolean;
  errorType: string;
}

const initialState: AuthState = {
  token: localStorage.getItem('token') || '',
  uid: localStorage.getItem('uid') || '',
  email: localStorage.getItem('email') || '',
  loading: false,
  errorType: '',
};

const authReducer = createReducer(
  initialState,
  on(signupStart, (state) => {
    return { ...state, loading: true };
  }),
  on(signupSuccess, (state) => {
    return { ...state, loading: false };
  }),
  on(signupFailed, (state, { errorType }) => {
    return { ...state, errorType, loading: false };
  }),
  on(signinStart, (state) => {
    return { ...state, loading: true };
  }),
  on(signinSuccess, (state, { token, uid, email }) => {
    localStorage.setItem('token', token);
    localStorage.setItem('uid', uid);
    localStorage.setItem('email', email);
    return { ...state, loading: false, token, uid, email };
  }),
  on(signinFailed, (state, { errorType }) => {
    return { ...state, errorType, loading: false };
  })
);

export default authReducer;

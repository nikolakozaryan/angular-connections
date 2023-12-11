import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectErrorType = createSelector(
  selectAuthState,
  ({ errorType }) => errorType
);

export const selectLoading = createSelector(
  selectAuthState,
  ({ loading }) => loading
);

export const selectIsAuthorized = createSelector(
  selectAuthState,
  ({ token, uid, email }) => !!(token && uid && email)
);

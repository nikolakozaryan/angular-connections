import { createFeatureSelector, createSelector } from "@ngrx/store";

import { ProfileState } from "./profile.reducer";

export const selectProfileState = createFeatureSelector<ProfileState>("profile");

export const selectProfileEmail = createSelector(
  selectProfileState,
  ({ email }) => email
);

export const selectProfileUid = createSelector(
  selectProfileState,
  ({ uid }) => uid
);

export const selectProfileName = createSelector(
  selectProfileState,
  ({ name }) => name
);

export const selectProfileDate = createSelector(
  selectProfileState,
  ({ createdAt }) => createdAt
);

export const selectProfileLoading = createSelector(
  selectProfileState,
  ({ loading }) => loading
);

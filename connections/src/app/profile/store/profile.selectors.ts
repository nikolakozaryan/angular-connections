import { createFeatureSelector } from "@ngrx/store";

import { ProfileState } from "./profile.reducer";

export const selectProfileState = createFeatureSelector<ProfileState>("profile");

// export const selectIsAuthorized = createSelector(
//   selectProfileState,
//   ({ token, uid, email }) => !!(token && uid && email)
// );

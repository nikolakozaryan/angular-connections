import { createFeatureSelector, createSelector } from "@ngrx/store";

import { MainState } from "./main.reducer";

export const selectMainState = createFeatureSelector<MainState>("main");

export const selectGroups = createSelector(
  selectMainState,
  ({ groups }) => groups
);

export const selectPeople = createSelector(
  selectMainState,
  ({ people }) => people
);

export const selectMainLoading = createSelector(
  selectMainState,
  ({ loading }) => loading
);

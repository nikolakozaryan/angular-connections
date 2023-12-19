import { createFeatureSelector, createSelector } from "@ngrx/store";

import { MainState } from "./main.reducer";

export const selectMainState = createFeatureSelector<MainState>("main");

export const selectGroups = createSelector(
  selectMainState,
  ({ groups }) => groups
);

export const selectGroup = (groupId: string) => createSelector(selectMainState, ({ groups }) => groups.find((group) => group.id === groupId));

export const selectPeople = createSelector(
  selectMainState,
  ({ people }) => people
);

export const selectMainLoading = createSelector(
  selectMainState,
  ({ loading }) => loading
);

export const selectUserName = (userID: string) => createSelector(selectMainState, ({ people }) => {
  const user = people.find((u) => u.uid === userID);
  return user?.name || "Unknown";
});

export const selectUsernameByConversationId = (conversationID: string) => createSelector(selectMainState, ({ people }) => {
  const user = people.find((u) => u.conversationID === conversationID);
  return user?.name || "Unknown";
});

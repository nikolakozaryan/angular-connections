import { createFeatureSelector, createSelector } from "@ngrx/store";

import { ConversationsState } from "./conversations.reducer";

export const selectConversationsState = createFeatureSelector<ConversationsState>("conversations");

export const selectLastConversationMessageDate = (props: {
  conversationID: string;
}) => createSelector(selectConversationsState, ({ conversations }) => {
  const { conversationID } = props;
  const conversation = conversations[conversationID];

  const conversationCopy = conversation ? [...conversation] : [];

  if (!conversation.length) return undefined;

  conversationCopy.sort((a, b) => +b.createdAt - +a.createdAt);

  return conversationCopy[0].createdAt;
});

export const selectConversationMessages = (props: { conversationID: string }) => createSelector(selectConversationsState, ({ conversations }) => {
  const { conversationID } = props;

  const conversation = [...(conversations[conversationID] || [])];

  conversation.sort((a, b) => +a.createdAt - +b.createdAt);

  return conversation;
});

export const selectIsGroupVisited = (conversationID: string) => createSelector(
  selectConversationsState,
  ({ conversations }) => conversations[conversationID]
);

export const selectConversationsLoading = createSelector(
  selectConversationsState,
  ({ loading }) => loading
);

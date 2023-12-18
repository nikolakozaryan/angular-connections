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

export const selectConversationMessages = (props: {
  conversationID: string;
}) => createSelector(selectConversationsState, ({ conversations }) => {
  const { conversationID } = props;

  return conversations[conversationID] || [];
});

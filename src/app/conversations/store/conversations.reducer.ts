import { createReducer, on } from "@ngrx/store";

import { MessageInterface } from "../models/interfaces/message.interface";
import {
  createConversationMessageFailed,
  createConversationMessageStart,
  createGroupMessageFailed,
  createGroupMessageStart,
  getConversationMessagesStart,
  getConversationMessagesSuccess,
  getGroupMessagesFailed,
  getGroupMessagesStart,
  getGroupMessagesSuccess,
} from "./conversations.actions";

export interface ConversationsState {
  conversations: { [key: string]: MessageInterface[] };
  loading: boolean;
}

const initialState: ConversationsState = {
  conversations: {},
  loading: false,
};

export const conversationsReducer = createReducer(
  initialState,
  on(getGroupMessagesStart, (state) => ({ ...state, loading: true })),
  on(getGroupMessagesSuccess, (state, { groupID, Items }) => ({
    ...state,
    loading: false,
    conversations: {
      ...state.conversations,
      [groupID]: [...(state.conversations[groupID] || []), ...Items],
    },
  })),
  on(getGroupMessagesFailed, (state) => ({ ...state, loading: false })),
  on(getConversationMessagesStart, (state) => ({ ...state, loading: true })),
  on(getConversationMessagesSuccess, (state, { conversationID, Items }) => ({
    ...state,
    loading: false,
    conversations: {
      ...state.conversations,
      [conversationID]: [
        ...(state.conversations[conversationID] || []),
        ...Items,
      ],
    },
  })),
  on(createGroupMessageStart, (state) => ({ ...state, loading: true })),
  on(createGroupMessageFailed, (state) => ({ ...state, loading: false })),
  on(createConversationMessageStart, (state) => ({ ...state, loading: true })),
  on(createConversationMessageFailed, (state) => ({ ...state, loading: false })),
);

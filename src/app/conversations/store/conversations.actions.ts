import { ApiErrorResponse } from "@auth/models/interfaces/auth.interface";
import {
  CreateConversationMessageDto,
  CreateGroupMessageDto,
  MessagesResponseWithConversation,
  MessagesResponseWithGroup,
} from "@conversations/models/interfaces/message.interface";
import { createActionGroup, emptyProps, props } from "@ngrx/store";

const source = "Conversations";

export const {
  getGroupMessagesStart,
  getGroupMessagesSuccess,
  getGroupMessagesFailed,
  createGroupMessageStart,
  createGroupMessageSuccess,
  createGroupMessageFailed,
  getConversationMessagesStart,
  getConversationMessagesSuccess,
  getConversationMessagesFailed,
  createConversationMessageStart,
  createConversationMessageSuccess,
  createConversationMessageFailed,
  deleteConversationStart,
  deleteConversationSuccess,
  deleteConversationFailed,
  resetConversationsState,
} = createActionGroup({
  source,
  events: {
    getGroupMessagesStart: props<{ groupID: string; since?: string }>(),
    getGroupMessagesSuccess: props<MessagesResponseWithGroup>(),
    getGroupMessagesFailed: props<ApiErrorResponse>(),
    createGroupMessageStart: props<CreateGroupMessageDto>(),
    createGroupMessageSuccess: props<{ groupID: string; since?: string }>(),
    createGroupMessageFailed: props<ApiErrorResponse>(),
    getConversationMessagesStart: props<{
      conversationID: string;
      since?: string;
    }>(),
    getConversationMessagesSuccess: props<MessagesResponseWithConversation>(),
    getConversationMessagesFailed: props<ApiErrorResponse>(),
    createConversationMessageStart: props<CreateConversationMessageDto>(),
    createConversationMessageSuccess: props<{
      conversationID: string;
      since?: string;
    }>(),
    createConversationMessageFailed: props<ApiErrorResponse>(),
    deleteConversationStart: props<{ conversationID: string }>(),
    deleteConversationSuccess: props<{ conversationID: string }>(),
    deleteConversationFailed: props<ApiErrorResponse>(),
    resetConversationsState: emptyProps(),
  },
});

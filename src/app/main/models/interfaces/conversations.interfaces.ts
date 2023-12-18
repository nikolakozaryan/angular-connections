export interface ConversationsRawResponse extends CountInterface {
  Items: ConversationRawResponse[];
}

export interface ConversationsResponse extends CountInterface {
  Items: ConversationResponse[];
}

export interface CreateConversationResponse {
  conversationID: string;
}

interface ConversationRawResponse {
  id: {
    S: string;
  };
  companionID: {
    S: string;
  };
}
export interface ConversationResponse {
  id: string;
  companionID: string;
}

interface CountInterface {
  Count: number;
}

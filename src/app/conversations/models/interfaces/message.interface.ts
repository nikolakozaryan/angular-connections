interface CountInterface {
  Count: number;
}

interface CreateMessageInterface {
  message: string;
}

interface RawMessageInterface {
  authorID: {
    S: string;
  };
  message: {
    S: string;
  };
  createdAt: {
    S: string;
  };
}

export interface MessagesRawResponse extends CountInterface {
  Items: RawMessageInterface[];
}

export interface MessagesResponse extends CountInterface {
  Items: MessageInterface[];
}

export interface MessagesResponseWithGroup extends MessagesResponse {
  groupID: string;
}

export interface MessagesResponseWithConversation extends MessagesResponse {
  conversationID: string;
}

export interface MessageInterface {
  authorID: string;
  message: string;
  createdAt: string;
}

export interface CreateGroupMessageDto extends CreateMessageInterface {
  groupID: string;
}
export interface CreateConversationMessageDto extends CreateMessageInterface {
  conversationID: string;
}

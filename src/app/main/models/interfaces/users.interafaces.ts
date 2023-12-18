export interface PeopleRawResponse extends CountInterface {
  Items: UserRawResponse[];
}

export interface PeopleResponse extends CountInterface {
  Items: UserResponse[];
}

interface CountInterface {
  Count: number;
}

interface UserRawResponse {
  name: {
    S: string;
  };
  uid: {
    S: string;
  };
}

export interface UserResponse {
  name: string;
  uid: string;
  conversationID: string | null;
}

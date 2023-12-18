export interface GroupsRawResponse extends CountInterface {
  Items: GroupRawInterface[];
}

export interface GroupsResponse extends CountInterface {
  Items: GroupInterface[];
}

export interface CreateGroupResponse {
  groupID: string;
}

export interface DeleteGroup {
  groupID: string;
}

interface CountInterface {
  Count: number;
}

interface GroupRawInterface {
  id: {
    S: string;
  };
  name: {
    S: string;
  };
  createdAt: {
    S: string;
  };
  createdBy: {
    S: string;
  };
}

export interface GroupInterface {
  id: string;
  name: string;
  createdAt: string;
  createdBy: string;
  isOwner: boolean;
}

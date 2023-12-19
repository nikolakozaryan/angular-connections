import { GroupInterface } from "@main/models/interfaces/groups.interfaces";
import { UserResponse } from "@main/models/interfaces/users.interafaces";
import { createReducer, on } from "@ngrx/store";

import {
  clearConversationId,
  createGroupFailed,
  createGroupStart,
  createGroupSuccess,
  deleteGroupFailed,
  deleteGroupStart,
  deleteGroupSuccess,
  getGroupsSuccess,
  getPeopleSuccess,
  resetMainState,
  updateUserConversationId,
} from "./main.actions";

export interface MainState {
  groupsCount: number;
  groups: GroupInterface[];
  peopleCount: number;
  people: UserResponse[];
  loading: boolean;
}

const initialState: MainState = {
  groupsCount: 0,
  groups: [],
  peopleCount: 0,
  people: [],
  loading: false,
};

const mainReducer = createReducer(
  initialState,
  on(getGroupsSuccess, (state, { Items, Count }) => ({
    ...state,
    groups: Items,
    groupsCount: Count,
  })),
  on(getPeopleSuccess, (state, { Items, Count }) => ({
    ...state,
    people: Items,
    peopleCount: Count,
  })),
  on(deleteGroupSuccess, (state, { groupID }) => ({
    ...state,
    groups: state.groups.filter((group) => group.id !== groupID),
  })),
  on(createGroupStart, (state) => ({ ...state, loading: true })),
  on(createGroupSuccess, (state, group) => ({
    ...state,
    loading: false,
    groupsCount: state.groupsCount + 1,
    groups: [...state.groups, group],
  })),
  on(createGroupFailed, (state) => ({ ...state, loading: false })),
  on(deleteGroupStart, (state) => ({ ...state, loading: true })),
  on(deleteGroupSuccess, (state, { groupID }) => {
    localStorage.removeItem("deleteGroupID");
    return {
      ...state,
      loading: false,
      groups: state.groups.filter((group) => group.id !== groupID),
    };
  }),
  on(deleteGroupFailed, (state) => ({ ...state, loading: false })),
  on(updateUserConversationId, (state, { conversationID, userID }) => ({
    ...state,
    people: state.people.map((user) => (user.uid === userID ? { ...user, conversationID } : user)),
  })),
  on(clearConversationId, (state, { conversationID }) => ({
    ...state,
    people: state.people.map((user) => (user.conversationID === conversationID
      ? { ...user, conversationID: null }
      : user)),
  })),
  on(resetMainState, () => initialState)
);

export default mainReducer;

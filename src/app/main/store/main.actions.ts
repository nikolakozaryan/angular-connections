import { ApiErrorResponse } from "@auth/models/interfaces/auth.interface";
import { CreateGroupDto } from "@main/models/dto/create-group.dto";
import {
  DeleteGroup,
  GroupInterface,
  GroupsResponse,
} from "@main/models/interfaces/groups.interfaces";
import { PeopleResponse } from "@main/models/interfaces/users.interafaces";
import { createActionGroup, emptyProps, props } from "@ngrx/store";

const source = "Main";

export const {
  getGroupsStart,
  getGroupsSuccess,
  getGroupsFailed,
  createGroupStart,
  createGroupSuccess,
  createGroupFailed,
  deleteGroupStart,
  deleteGroupSuccess,
  deleteGroupFailed,
  getPeopleStart,
  getPeopleSuccess,
  getPeopleFailed,
  resetMainState,
  updateUserConversationId,
  clearConversationId,
} = createActionGroup({
  source,
  events: {
    getGroupsStart: emptyProps(),
    getGroupsSuccess: props<GroupsResponse>(),
    getGroupsFailed: props<ApiErrorResponse>(),
    createGroupStart: props<CreateGroupDto>(),
    createGroupSuccess: props<GroupInterface>(),
    createGroupFailed: props<ApiErrorResponse>(),
    deleteGroupStart: props<DeleteGroup>(),
    deleteGroupSuccess: props<DeleteGroup>(),
    deleteGroupFailed: props<ApiErrorResponse>(),
    getPeopleStart: emptyProps(),
    getPeopleSuccess: props<PeopleResponse>(),
    getPeopleFailed: props<ApiErrorResponse>(),
    resetMainState: emptyProps(),
    updateUserConversationId: props<{
      userID: string;
      conversationID: string;
    }>(),
    clearConversationId: props<{ conversationID: string }>(),
  },
});

import { AuthData, AuthError } from "@auth/models/interfaces/auth.interface";
import { createActionGroup, emptyProps, props } from "@ngrx/store";

import { EditProfileDTO } from "../core/interfaces/edit-profile.dto";
import { GetProfileResponseDTO } from "../core/interfaces/get-profile.dto";

const source = "Profile";

export const {
  getProfileStart,
  getProfileSuccess,
  getProfileFailed,
  editProfileStart,
  editProfileSuccess,
  editProfileFailed,
} = createActionGroup({
  source,
  events: {
    getProfileStart: emptyProps(),
    getProfileSuccess: props<GetProfileResponseDTO>(),
    getProfileFailed: props<AuthError>(),
    editProfileStart: props<EditProfileDTO>(),
    editProfileSuccess: props<AuthData>(),
    editProfileFailed: props<AuthError>(),
  },
});

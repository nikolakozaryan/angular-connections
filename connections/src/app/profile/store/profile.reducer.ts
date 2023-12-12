import { createReducer, on } from "@ngrx/store";

import {
  getProfileFailed,
  getProfileStart, getProfileSuccess
} from "./profile.actions";

export interface ProfileState {
  email: string,
  name: string,
  uid: string,
  createdAt: string,
}

const initialState: ProfileState = {
  email: "",
  name: "",
  uid: "",
  createdAt: "",
};

const profileReducer = createReducer(
  initialState,
  on(getProfileStart, (state) => ({ ...state, loading: true })),
  on(getProfileSuccess, (state, data) => ({ ...state, ...data })),
  on(getProfileFailed, (state) => ({ ...state, loading: false })),
);

export default profileReducer;

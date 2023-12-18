import { createReducer, on } from "@ngrx/store";

import {
  editProfileFailed,
  editProfileStart,
  editProfileSuccess,
  getProfileFailed,
  getProfileStart,
  getProfileSuccess,
  resetProfileState,
} from "./profile.actions";

export interface ProfileState {
  email: string;
  name: string;
  uid: string;
  createdAt: string;
  loading: boolean;
}

const initialState: ProfileState = {
  email: "",
  name: "",
  uid: "",
  createdAt: "",
  loading: false,
};

const profileReducer = createReducer(
  initialState,
  on(getProfileStart, (state) => ({ ...state, loading: true })),
  on(getProfileSuccess, (state, data) => ({
    ...state,
    ...data,
    loading: false,
  })),
  on(getProfileFailed, (state) => ({ ...state, loading: false })),
  on(editProfileStart, (state) => ({ ...state, loading: true })),
  on(editProfileSuccess, (state, { name }) => ({
    ...state,
    name,
    loading: false,
  })),
  on(editProfileFailed, (state) => ({ ...state, loading: false })),
  on(resetProfileState, () => initialState)
);

export default profileReducer;

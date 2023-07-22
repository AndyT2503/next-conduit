import { Profile } from "@/lib/models";
import { createSlice } from "@reduxjs/toolkit";
import { loadProfile, toggleFollowProfile } from "./profile.action";

interface ProfileState {
  profile: Profile | null;
}

const initialState: ProfileState = {
  profile: null,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(loadProfile.fulfilled, (state, action) => {
      state.profile = action.payload.profile;
    });
    builder.addCase(toggleFollowProfile.fulfilled, (state, action) => {
      state.profile = action.payload.profile;
    });
  },
});
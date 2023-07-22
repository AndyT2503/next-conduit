import { profileAPI } from "@/lib/api";
import { Profile } from "@/lib/models";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getProfile = createAsyncThunk(
  "profile/getProfile",
  async (username: string, { rejectWithValue }) => {
    try {
      const response = await profileAPI.getProfile(username);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const toggleFollowProfile = createAsyncThunk(
  "profile/toggleFollowProfile",
  async (profile: Profile, { rejectWithValue }) => {
    try {
      if (profile.following) {
        return await profileAPI.unFollowProfile(profile.username);
      } else {
        return await profileAPI.followProfile(profile.username);
      }
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

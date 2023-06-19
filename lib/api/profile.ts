import { ProfileAPIResponse } from "../models";
import axiosRequest from "./axios-request";

export const profileAPI = {
  getProfile: async (username: string) => {
    const response = await axiosRequest.get<ProfileAPIResponse>(
      `profiles/${username}`
    );
    return response.data;
  },
  followProfile: async (username: string) => {
    const response = await axiosRequest.post<ProfileAPIResponse>(
      `profiles/${username}/follow`
    );
    return response.data;
  },
  unFollowProfile: async (username: string) => {
    const response = await axiosRequest.delete<ProfileAPIResponse>(
      `profiles/${username}/follow`
    );
    return response.data;
  },
};

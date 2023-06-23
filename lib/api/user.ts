import { User, UserAPIResponse } from "../models";
import axiosRequest from "./axios-request";

export type LoginBodyRequest = Pick<User, "email"> & { password: string };

export type RegisterBodyRequest = Pick<User, "email" | "username"> & {
  password: string;
};


export type UpdateCurrentUserBodyRequest = Pick<
  User,
  "email" | "username" | "bio" | "image"
> & { password: string };

export const userAPI = {
  login: async (user: LoginBodyRequest) => {
    const response = await axiosRequest.post<UserAPIResponse>("users/login", {
      user,
    });
    return response.data;
  },
  register: async (user: RegisterBodyRequest) => {
    const response = await axiosRequest.post<UserAPIResponse>("users", {
      user,
    });
    return response.data;
  },
  getCurrentUser: async () => {
    const response = await axiosRequest.get<UserAPIResponse>("users");
    return response.data;
  },
  updateCurrentUser: async (user: UpdateCurrentUserBodyRequest) => {
    const response = await axiosRequest.put<UserAPIResponse>("user", {
      user,
    });
    return response.data;
  }
};

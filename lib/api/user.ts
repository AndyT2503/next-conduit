import { User } from "../models/user";
import axiosRequest from "./axios-request";
export interface LoginRequest {
  email: string;
  password: string;
}

export const userAPI = {
  login: async (req: LoginRequest) => {
    try {
      const response = await axiosRequest.post<User>("users/login", {
        ...req,
      });
      return response.data;
    } catch (error) {
      return error;
    }
  },
};

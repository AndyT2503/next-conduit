import { TagAPIResponse } from "../models";
import axiosRequest from "./axios-request";

export const tagAPI = {
  getTags: async () => {
    const response = await axiosRequest.get<TagAPIResponse>("tags");
    return response.data;
  },
};

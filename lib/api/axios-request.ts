import { StorageKey } from "@/lib/constants";
import { ErrorResponse, User } from "@/lib/models";
import { storageService } from "@/lib/utils";
import axios, { InternalAxiosRequestConfig } from "axios";

const axiosInstance = axios.create();

const apiPrefixInterceptor = (req: InternalAxiosRequestConfig) => {
  if (!req.url?.includes("http:") && !req.url?.includes("https:")) {
    req.baseURL = `${process.env.apiUrl}`;
  }
};

const authInterceptor = (req: InternalAxiosRequestConfig) => {
  const user = storageService("localStorage").getItem<User>(StorageKey.User);
  const token = user?.token;
  if (
    req.baseURL &&
    !req.headers.has("Authorization") &&
    token
  ) {
    req.headers.Authorization = `Token ${token}`;
  }
};

axiosInstance.interceptors.request.use((req) => {
  apiPrefixInterceptor(req);
  authInterceptor(req);
  return req;
});

axiosInstance.interceptors.response.use(undefined, (error) => {
  if (axios.isAxiosError(error) && error.response?.data?.errors) {
    throw error.response?.data as ErrorResponse;
  } else {
    throw {
      errors: {
        request: ["has some internal server errors"],
      },
    } as ErrorResponse;
  }
});

export default axiosInstance;

import { StorageKey } from "@/lib/constants";
import { User } from "@/lib/models";
import { storageService } from "@/lib/utils";
import axios, { InternalAxiosRequestConfig } from "axios";

const axiosInstance = axios.create();

const apiPrefixInterceptor = (req: InternalAxiosRequestConfig) => {
  if (!req.baseURL?.includes("http:") && !req.url?.includes("https:")) {
    req.baseURL = `${process.env.apiUrl}`;
  }
};

const authInterceptor = (req: InternalAxiosRequestConfig) => {
  const user = storageService("localStorage").getItem<User>(StorageKey.user);
  const token = user?.token;
  if (
    req.url?.includes("/api/") &&
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

export default axiosInstance;

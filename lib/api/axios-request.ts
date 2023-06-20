import axios, { InternalAxiosRequestConfig } from "axios";
import { useLocalStorage } from "@/lib/utils";
import { StorageKey } from "@/lib/constants";
import { User } from "@/lib/models";

const axiosInstance = axios.create();

const apiPrefixInterceptor = (req: InternalAxiosRequestConfig) => {
  if (!req.baseURL?.includes("http:") && !req.baseURL?.includes("https:")) {
    req.baseURL = `${process.env.apiUrl}/${req.baseURL}`;
  }
};

const authInterceptor = (req: InternalAxiosRequestConfig) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [user] = useLocalStorage<User>(StorageKey.user);
  const token = user?.token;
  if (
    req.url?.includes("/api/") &&
    !req.headers.has("Authorization") &&
    token
  ) {
    req.headers.Authorization = `Token ${token}`;
  }
};

axiosInstance.interceptors.request.use(
  (req) => {
    apiPrefixInterceptor(req);
    authInterceptor(req);
    return req;
  },
);

export default axiosInstance;

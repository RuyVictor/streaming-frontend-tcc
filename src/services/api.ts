import axios from "axios";
import { StoragePrefix } from "../hooks/auth.hook";

const api = axios.create({
  baseURL: "http://localhost:3333",
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config; // request original
    
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const accessToken = localStorage.getItem(StoragePrefix.accessToken);
      const refreshToken = localStorage.getItem(StoragePrefix.refreshToken);

      const response = await api.post(
        "/auth/refresh-token",
        { accessToken, refreshToken },
      );

      if (response.status === 200) {
        const newAccessToken = response.data.newAccessToken;
        localStorage.setItem(StoragePrefix.accessToken, newAccessToken);
        api.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
        error.config.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export default api;

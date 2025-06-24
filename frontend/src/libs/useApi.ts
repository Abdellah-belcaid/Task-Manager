import type { AxiosError, AxiosInstance } from "axios";
import axios from "axios";
import { useEffect, useRef } from "react";
import { useAuth } from "../hooks/useAuth";

export const useApi = () => {
  const { getAuthToken } = useAuth();
  const axiosInstance = useRef<AxiosInstance>(axios.create());

  useEffect(() => {
    const instance = axiosInstance.current;

    instance.interceptors.request.use(
      (config) => {
        const token = getAuthToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    instance.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        console.error("API Error:", error);
        return Promise.reject(error);
      }
    );
  }, []);

  return axiosInstance.current;
};

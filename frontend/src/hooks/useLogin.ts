import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { alertError, alertSuccess } from "../libs/alerts";
import { useApi } from "../libs/useApi";
import type { AuthenticationRequest, UserDTO } from "../types/user";
import { USER_API } from "../utils/apis.constants";
import { ROUTES } from "../utils/constants";
import { useAuth } from "./useAuth";

export const useLogin = () => {
  const api = useApi();
  const navigate = useNavigate();
  const { login } = useAuth();

  return useMutation({
    mutationFn: async (credentials: AuthenticationRequest) => {
      const response = await api.post<UserDTO>(USER_API.SIGN_IN, credentials);
      return response.data;
    },
    onSuccess: (user: UserDTO) => {
      alertSuccess("Login successful!").then(() => {
        login(user);
        navigate(ROUTES.HOME);
      });
    },
    onError: (error: AxiosError) => {
      alertError(error?.response?.data as string);
    },
  });
};

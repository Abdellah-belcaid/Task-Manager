import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { alertError, alertSuccess } from "../libs/alerts";
import { useApi } from "../libs/useApi";
import type { RegisterRequest } from "../types/user";
import { USER_API } from "../utils/apis.constants";
import { ROUTES } from "../utils/constants";

export const useRegister = () => {
  const api = useApi();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (userData: RegisterRequest) => {
      await api.post(USER_API.SIGN_UP, userData); 
    },
    onSuccess: () => {
      alertSuccess("Registration successful! You can now log in.").then(() => {
        navigate(ROUTES.LOGIN);
      });
    },
    onError: (error: AxiosError) => {
      alertError(error?.response?.data as string);
    },
  });
};

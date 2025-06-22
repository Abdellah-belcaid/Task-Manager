import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useApi } from "../libs/useApi";
import type { TaskDTO } from "../types/task";
import { TASK_API } from "../utils/apis.constants";
import { ROUTES } from "../utils/constants";
import { alertError, alertSuccess } from "../libs/alerts";
import type { AxiosError } from "axios";

export const useCreateTask = () => {
  const api = useApi();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (newTask: TaskDTO) => {
      const response = await api.post<TaskDTO>(TASK_API.CREATE, newTask);
      return response.data;
    },
    onSuccess: () => {
      alertSuccess("Task created successfully!").then(() => {
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
        navigate(ROUTES.TASKS);
      });
    },
    onError: (error: AxiosError) => {
      alertError(error?.response?.data as string);
    },
  });
};

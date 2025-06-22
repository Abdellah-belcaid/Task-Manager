import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useApi } from "../libs/useApi";
import type { TaskDTO } from "../types/task";
import { TASK_API } from "../utils/apis.constants";
import { ROUTES } from "../utils/constants";

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
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      navigate(ROUTES.TASKS);
    },
    onError: (error) => {
      console.error("Error creating task:", error);
    },
  });
};

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useApi } from "../libs/useApi";
import type { TaskDTO } from "../types/task";
import { TASK_API } from "../utils/apis.constants";
import { ROUTES } from "../utils/constants";

interface UpdateTaskParams {
  id: string;
  updatedTask: TaskDTO;
}

export const useUpdateTask = () => {
  const api = useApi();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({ id, updatedTask }: UpdateTaskParams) => {
      const response = await api.put<TaskDTO>(
        `${TASK_API.UPDATE(id)}`,
        updatedTask
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      navigate(ROUTES.TASKS);
    },
    onError: (error) => {
      console.error("Error updating task:", error);
    },
  });
};

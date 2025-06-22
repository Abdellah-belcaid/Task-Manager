import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useApi } from "../libs/useApi";
import { TASK_API } from "../utils/apis.constants";
import { ROUTES } from "../utils/constants";

export const useDeleteTask = () => {
  const api = useApi();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (taskId: string) => {
      await api.delete(`${TASK_API.DELETE(taskId)}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      navigate(ROUTES.TASKS);
    },
    onError: (error) => {
      console.error("Error deleting task:", error);
    },
  });
};

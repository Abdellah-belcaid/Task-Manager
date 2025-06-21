import { useQuery } from "@tanstack/react-query";
import { useApi } from "../libs/useApi";
import type { TaskDTO } from "../types/task";
import { TASK_API } from "../utils/apis.constants";

interface TaskQueryParams {
  page?: number;
  size?: number;
  sortBy?: string;
  sortDirection?: "asc" | "desc";
}

interface TaskResponse {
  content: TaskDTO[];
  totalElements: number;
}

export const useAllTasks = ({
  page = 1,
  size = 5,
  sortBy = "createdAt",
  sortDirection = "asc",
}: TaskQueryParams) => {
  const api = useApi();

  return useQuery<TaskResponse>({
    queryKey: ["tasks", page, size, sortBy, sortDirection],
    queryFn: async () => {
      const response = await api.get<TaskResponse>(TASK_API.GET_ALL, {
        params: { page, size, sortBy, sortDirection },
      });
      return response.data;
    },
  });
};

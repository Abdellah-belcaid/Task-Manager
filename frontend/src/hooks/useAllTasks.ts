import { useQuery } from "@tanstack/react-query";
import { useApi } from "../libs/useApi";
import type { TaskDTO } from "../types/task";
import { TASK_API } from "../utils/apis.constants";

interface TaskQueryParams {
  page?: number;
  size?: number;
  sortBy?: string;
  sortDirection?: "asc" | "desc";
  keyword?: string;
  status?: string;
  priority?: string;
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
  keyword = "",
  status = "",
  priority = "",
}: TaskQueryParams) => {
  const api = useApi();

  return useQuery<TaskResponse>({
    queryKey: [
      "tasks",
      page,
      size,
      sortBy,
      sortDirection,
      keyword,
      status,
      priority,
    ],
    queryFn: async () => {
      const response = await api.get<TaskResponse>(TASK_API.GET_ALL, {
        params: {
          page,
          size,
          sortBy,
          sortDirection,
          keyword,
          status,
          priority,
        },
      });
      return response.data;
    },
  });
};

import { useQuery } from "@tanstack/react-query";
import { useApi } from "../libs/useApi";
import type { TaskDTO } from "../types/task";
import { TASK_API } from "../utils/apis.constants";

export const useGetTaskById = (id: string) => {
  const api = useApi();

  return useQuery<TaskDTO>({
    queryKey: ["task", id],
    queryFn: async () => {
      const response = await api.get<TaskDTO>(`${TASK_API.GET_BY_ID(id)}`);
      return response.data;
    },
    enabled: !!id,
  });
};

export default useGetTaskById;

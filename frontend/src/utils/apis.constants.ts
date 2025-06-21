export const TASK_API = {
  BASE_URL: "/api/v1/tasks",
  GET_ALL: "/api/v1/tasks",
  GET_BY_ID: (id: string) => `/api/v1/tasks/${id}`,
  CREATE: "/api/v1/tasks",
  UPDATE: (id: string) => `/api/v1/tasks/${id}`,
  DELETE: (id: string) => `/api/v1/tasks/${id}`,
};

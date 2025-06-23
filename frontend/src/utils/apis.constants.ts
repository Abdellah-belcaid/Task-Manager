export const TASK_API = {
  BASE_URL: "/api/v1/tasks",
  GET_ALL: "/api/v1/tasks",
  GET_BY_ID: (id: string) => `/api/v1/tasks/${id}`,
  CREATE: "/api/v1/tasks",
  UPDATE: (id: string) => `/api/v1/tasks/${id}`,
  DELETE: (id: string) => `/api/v1/tasks/${id}`,
};

export const USER_API = {
  BASE_URL: "/api/v1/users",
  SIGN_UP: "/api/v1/users/sign-up",
  SIGN_IN: "/api/v1/users/sign-in",
};

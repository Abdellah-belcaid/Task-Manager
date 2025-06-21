import { QueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";

const HTTP_STATUS_TO_NOT_RETRY = [400, 401, 403, 404];
const MAX_RETRIES = 3;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        if (
          isAxiosError(error) &&
          HTTP_STATUS_TO_NOT_RETRY.includes(Number(error.response?.status))
        ) {
          return false;
        }

        if (failureCount > MAX_RETRIES) {
          return false;
        }

        return true;
      },
    },
  },
});

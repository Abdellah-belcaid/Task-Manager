export interface TaskDTO {
  id?: string;

  title: string;

  description?: string;

  status: Status;

  priority: Priority;

  dueDate?: string;

  completed: boolean;

  createdAt?: string;

  updatedAt?: string;
}

export const StatusValues = ["TODO", "IN_PROGRESS", "DONE"] as const;
export const PriorityValues = ["LOW", "MEDIUM", "HIGH", "URGENT"] as const;

export type Status = (typeof StatusValues)[number];
export type Priority = (typeof PriorityValues)[number];

export const INIT_TASK_VALUES: TaskDTO = {
  title: "",
  description: "",
  status: "TODO",
  priority: "MEDIUM",
  dueDate: new Date().toISOString().split("T")[0], // Default to today
  completed: false,
};

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

export type Priority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";
export type Status = "TODO" | "IN_PROGRESS" | "DONE";

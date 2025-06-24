import React from "react";
import TaskForm from "../components/TaskForm";
import { useCreateTask } from "../hooks/useCreateTask";
import { INIT_TASK_VALUES, type TaskDTO } from "../types/task";

const AddTaskPage: React.FC = () => {
  const { mutate: createTask, error } = useCreateTask();

  const handleSubmit = (values: TaskDTO) => {
    createTask(values);
  };

  return (
    <div className="px-6 py-2">
      <h1 className="text-xl font-bold mb-4 text-center text-gray-800">
        Add New Task
      </h1>
      <TaskForm initialValues={INIT_TASK_VALUES} onSubmit={handleSubmit} />
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mt-2">
          Error creating task: {error.message}
        </div>
      )}
    </div>
  );
};

export default AddTaskPage;

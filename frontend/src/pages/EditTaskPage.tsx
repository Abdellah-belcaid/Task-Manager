import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import useGetTaskById from "../hooks/useGetTaskById";
import { useUpdateTask } from "../hooks/useUpdateTask";
import { type TaskDTO } from "../types/task";

const EditTaskPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: task, error: fetchError, isLoading } = useGetTaskById(id!);
  const { mutate: updateTask, error: updateError } = useUpdateTask();
  const [initialValues, setInitialValues] = useState<TaskDTO | null>(null);

  useEffect(() => {
    if (task) {
      setInitialValues(task);
    }
  }, [task]);

  const handleSubmit = (values: TaskDTO) => {
    updateTask({ id: id!, updatedTask: values });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (fetchError) {
    return (
      <div className="bg-red-100 text-red-700 p-3 rounded mt-2">
        Error fetching task: {fetchError.message}
      </div>
    );
  }

  return (
    <div className="px-6 py-2">
      <h1 className="text-xl font-bold mb-2">Edit Task</h1>
      {initialValues && (
        <TaskForm initialValues={initialValues} onSubmit={handleSubmit} />
      )}
      {updateError && (
        <div className="bg-red-100 text-red-700 p-3 rounded mt-2">
          Error updating task: {updateError.message}
        </div>
      )}
    </div>
  );
};

export default EditTaskPage;

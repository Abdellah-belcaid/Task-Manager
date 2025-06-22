import {
  ChevronDown,
  ChevronUp,
  DeleteIcon,
  EditIcon,
  Plus,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";
import { useAllTasks } from "../hooks/useAllTasks";
import { useDeleteTask } from "../hooks/useDeleteTask";
import type { TaskDTO } from "../types/task";
import { ROUTES } from "../utils/constants";

const columns = [
  { label: "Title", key: "title" },
  { label: "Description", key: "description" },
  { label: "Status", key: "status" },
  { label: "Priority", key: "priority" },
  { label: "Due Date", key: "dueDate" },
];

const TasksPage: React.FC = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const [tasks, setTasks] = useState<TaskDTO[]>([]);

  const { mutate: deleteTask } = useDeleteTask();
  const { data, isLoading, error } = useAllTasks({
    page,
    size: rowsPerPage,
    sortBy,
    sortDirection,
  });

  useEffect(() => {
    if (data?.content) {
      setTasks(data.content);
    }
  }, [data]);

  const totalCount = data?.totalElements ?? 0;
  const totalPages = Math.ceil(totalCount / rowsPerPage);

  const handleDelete = (taskId: string) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      deleteTask(taskId);
    }
  };
  const handleUpdate = (taskId: string) => {
    navigate(ROUTES.EDIT_TASK.replace(":id", taskId));
  };

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(column);
      setSortDirection("asc");
    }
  };

  const renderSortArrow = (column: string) => {
    if (sortBy === column) {
      return sortDirection === "asc" ? (
        <ChevronUp className="w-4 h-4 text-gray-500" />
      ) : (
        <ChevronDown className="w-4 h-4 text-gray-500" />
      );
    }
    return null;
  };

  if (isLoading) return <div>Loading tasks...</div>;
  if (error) return <div>Error loading tasks</div>;

  return (
    <div className="px-6 py-2">
      <div className="mb-4 w-full p-4 bg-gray-50 shadow-sm flex justify-between items-center">
        <div>
          <strong>Total Tasks:</strong> {totalCount}
        </div>
        <button
          onClick={() => (window.location.href = ROUTES.ADD_TASK)}
          className="px-3 py-1 bg-green-400 text-white rounded-md shadow hover:bg-green-500 transition flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>ADD NEW TASK</span>
        </button>
      </div>

      {/* Tasks Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-200">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-3 text-left font-semibold text-gray-700 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort(column.key)}
                >
                  <div className="flex items-center group">
                    <span className="group-hover:text-gray-900">
                      {column.label}
                    </span>
                    <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {renderSortArrow(column.key)}
                    </span>
                  </div>
                </th>
              ))}
              <th className="px-6 py-3 text-left font-semibold text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr
                key={task.id}
                className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}
              >
                <td className="px-6 py-4 text-gray-800">{task.title}</td>
                <td className="px-6 py-4 text-gray-800">{task.description}</td>
                <td className="px-6 py-4 text-gray-800">{task.status}</td>
                <td className="px-6 py-4 text-gray-800">{task.priority}</td>
                <td className="px-6 py-4 text-gray-800">{task.dueDate}</td>
                <td className="px-6 py-4 text-gray-800">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => task.id && handleUpdate(task.id)}
                      className="text-blue-500 hover:text-blue-700"
                      title="Update Task"
                    >
                      <EditIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => task.id && handleDelete(task.id)}
                      className="text-red-500 hover:text-red-700"
                      title="Delete Task"
                    >
                      <DeleteIcon className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination
        page={page}
        totalPages={totalPages}
        rowsPerPage={rowsPerPage}
        setPage={setPage}
        setRowsPerPage={setRowsPerPage}
      />
    </div>
  );
};

export default TasksPage;

import { ChevronDown, ChevronUp, DeleteIcon, EditIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";
import TasksHeader from "../components/TasksHeader";
import { useAllTasks } from "../hooks/useAllTasks";
import { useDeleteTask } from "../hooks/useDeleteTask";
import { alertConfirmation } from "../libs/alerts";
import type { Priority, Status, TaskDTO } from "../types/task";
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

  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<Status | null>(null);
  const [priorityFilter, setPriorityFilter] = useState<Priority | null>(null);

  const [tasks, setTasks] = useState<TaskDTO[]>([]);

  const { mutate: deleteTask } = useDeleteTask();
  const { data, isLoading, error } = useAllTasks({
    page,
    size: rowsPerPage,
    sortBy,
    sortDirection,
    keyword: searchKeyword,
    status: statusFilter ?? undefined,
    priority: priorityFilter ?? undefined,
  });

  useEffect(() => {
    if (data?.content) {
      setTasks(data.content);
    }
  }, [data]);

  const totalCount = data?.totalElements ?? 0;
  const totalPages = Math.ceil(totalCount / rowsPerPage);

  const handleDelete = async (taskId: string) => {
    const result = await alertConfirmation(
      "Delete Task",
      "Are you sure you want to delete this task?",
      "Yes, delete it!",
      "Cancel"
    );

    if (result.isConfirmed) {
      deleteTask(taskId);
    }
  };
  const handleUpdate = (taskId: string) => {
    navigate(ROUTES.EDIT_TASK.replace(":id", taskId));
  };

  const handleSearchChange = (keyword: string) => {
    setSearchKeyword(keyword);
    setPage(1);
  };

  const handleStatusFilterChange = (status: Status | null) => {
    setStatusFilter(status);
    setPage(1);
  };

  const handlePriorityFilterChange = (priority: Priority | null) => {
    setPriorityFilter(priority);
    setPage(1);
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

  return (
    <div className="px-6 py-2">
      {/* Tasks Header */}
      <TasksHeader
        totalCount={totalCount}
        searchKeyword={searchKeyword}
        onSearchChange={handleSearchChange}
        statusFilter={statusFilter}
        onStatusFilterChange={handleStatusFilterChange}
        priorityFilter={priorityFilter}
        onPriorityFilterChange={handlePriorityFilterChange}
        onAddTask={() => navigate(ROUTES.ADD_TASK)}
      />

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
          {isLoading && (
            <tbody>
              <tr>
                <td colSpan={columns.length + 1} className="text-center py-4">
                  Loading tasks...
                </td>
              </tr>
            </tbody>
          )}
          {error && (
            <tbody>
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="text-center py-4 text-red-500"
                >
                  Error loading tasks
                </td>
              </tr>
            </tbody>
          )}

          {!isLoading && !error && (
            <tbody>
              {tasks.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length + 1}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No tasks found
                  </td>
                </tr>
              ) : (
                tasks.map((task, index) => (
                  <tr
                    key={task.id}
                    className={`${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-gray-100`}
                  >
                    <td className="px-6 py-4 text-gray-800">{task.title}</td>
                    <td className="px-6 py-4 text-gray-800">
                      {task.description}
                    </td>
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
                ))
              )}
            </tbody>
          )}
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

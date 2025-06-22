import { Plus, Search } from "lucide-react";
import React from "react";
import {
    PriorityValues,
    StatusValues,
    type Priority,
    type Status,
} from "../types/task";

interface TasksHeaderProps {
  totalCount: number;
  searchKeyword: string;
  onSearchChange: (value: string) => void;
  statusFilter: Status | null;
  onStatusFilterChange: (value: Status | null) => void;
  priorityFilter: Priority | null;
  onPriorityFilterChange: (value: Priority | null) => void;
  onAddTask: () => void;
}

const TasksHeader: React.FC<TasksHeaderProps> = ({
  totalCount,
  searchKeyword,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  priorityFilter,
  onPriorityFilterChange,
  onAddTask,
}) => {
  return (
    <>
      <div className="mb-4 w-full p-4 bg-gray-50 shadow-sm flex justify-between items-center">
        <div>
          <strong>Total Tasks:</strong> {totalCount}
        </div>
        <button
          onClick={onAddTask}
          className="px-3 py-1 bg-green-400 text-white rounded-md shadow hover:bg-green-500 transition flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>ADD NEW TASK</span>
        </button>
      </div>

      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        {/* Search */}
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchKeyword}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full text-sm"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <select
            value={statusFilter ?? ""}
            onChange={(e) =>
              onStatusFilterChange(
                e.target.value ? (e.target.value as Status) : null
              )
            }
            className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full md:w-auto"
          >
            <option value="">All Statuses</option>
            {StatusValues.map((status) => (
              <option key={status} value={status}>
                {status.replace("_", " ").toUpperCase()}
              </option>
            ))}
          </select>

          <select
            value={priorityFilter ?? ""}
            onChange={(e) =>
              onPriorityFilterChange(
                e.target.value ? (e.target.value as Priority) : null
              )
            }
            className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full md:w-auto"
          >
            <option value="">All Priorities</option>
            {PriorityValues.map((priority) => (
              <option key={priority} value={priority}>
                {priority.charAt(0).toUpperCase() +
                  priority.slice(1).toLowerCase()}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};

export default TasksHeader;

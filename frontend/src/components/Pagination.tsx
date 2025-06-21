import React from "react";

interface PaginationProps {
  page: number;
  totalPages: number;
  rowsPerPage: number;
  setPage: (page: number) => void;
  setRowsPerPage: (rows: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  rowsPerPage,
  setPage,
  setRowsPerPage,
}) => {
  return (
    <div className="flex items-center justify-between mt-4 bg-white px-4 py-2 border border-gray-200">
      <div className="flex items-center">
        <label
          htmlFor="rowsPerPage"
          className="mr-2 text-sm font-medium text-gray-700"
        >
          Rows per page:
        </label>
        <select
          id="rowsPerPage"
          value={rowsPerPage}
          onChange={(e) => setRowsPerPage(Number(e.target.value))}
          className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>

      <div className="flex items-center space-x-4">
        <button
          onClick={() => setPage(Math.max(page - 1, 1))}
          disabled={page === 1}
          className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
            page === 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Previous
        </button>
        <span className="text-sm font-medium text-gray-700">
          Page <span className="font-bold">{page}</span> of{" "}
          <span className="font-bold">{totalPages}</span>
        </span>
        <button
          onClick={() => setPage(Math.min(page + 1, totalPages))}
          disabled={page === totalPages}
          className={`px-4 py- py-1.5 rounded-md text-sm font-medium transition-colors ${
            page === totalPages
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;

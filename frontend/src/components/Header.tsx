import { Home, List } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../utils/constants";

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Home className="w-6 h-6 text-blue-500" />
          <Link to={ROUTES.HOME}>Task Manager</Link>
        </h1>
        <nav>
          <Link
            to={ROUTES.TASKS}
            className="text-gray-600 hover:text-blue-500 flex items-center gap-1"
          >
            <List className="w-5 h-5" />
            Tasks
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;

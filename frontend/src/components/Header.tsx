import { Home, List, LogOut } from "lucide-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { ROUTES } from "../utils/constants";

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate(ROUTES.LOGIN);
    logout();
  };

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Home className="w-6 h-6 text-blue-500" />
          <Link to={ROUTES.HOME}>Task Manager</Link>
        </h1>

        <nav className="flex items-center gap-4">
          <Link
            to={ROUTES.TASKS}
            className="text-gray-600 hover:text-blue-500 flex items-center gap-1"
          >
            <List className="w-5 h-5" />
            Tasks
          </Link>

          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="text-gray-600 hover:text-red-500 flex items-center gap-1"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;

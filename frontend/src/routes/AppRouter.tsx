import React, { Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { ROUTES } from "../utils/constants";
import PrivateRoute from "./PrivateRoute";

const HomePage = React.lazy(() => import("../pages/HomePage"));
const TasksPage = React.lazy(() => import("../pages/TasksPage"));
const AddTaskPage = React.lazy(() => import("../pages/AddTaskPage"));
const EditTaskPage = React.lazy(() => import("../pages/EditTaskPage"));
const LoginPage = React.lazy(() => import("../pages/LoginPage"));
const RegisterPage = React.lazy(() => import("../pages/RegisterPage"));

const AppRouter: React.FC = () => {
  const location = useLocation();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes location={location}>
        <Route
          path={ROUTES.HOME}
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path={ROUTES.TASKS}
          element={
            <PrivateRoute>
              <TasksPage />
            </PrivateRoute>
          }
        />
        <Route
          path={ROUTES.ADD_TASK}
          element={
            <PrivateRoute>
              <AddTaskPage />
            </PrivateRoute>
          }
        />
        <Route
          path={ROUTES.EDIT_TASK.replace(":id", ":id")}
          element={
            <PrivateRoute>
              <EditTaskPage />
            </PrivateRoute>
          }
        />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;

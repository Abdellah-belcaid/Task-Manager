import React, { Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { ROUTES } from "../utils/constants";

const HomePage = React.lazy(() => import("../pages/HomePage"));
const TasksPage = React.lazy(() => import("../pages/TasksPage"));

const AppRouter: React.FC = () => {
  const location = useLocation();

  return (
    <Suspense fallback={<div> Loading...</div>}>
      <Routes location={location}>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.TASKS} element={<TasksPage />} />        
      </Routes>
    </Suspense>
  );
};

export default AppRouter;

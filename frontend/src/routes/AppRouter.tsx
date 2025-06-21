import React, { Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { ROUTES } from "../utils/constants";

const HomePage = React.lazy(() => import("../pages/HomePage"));

const AppRouter: React.FC = () => {
  const location = useLocation();

  return (
    <Suspense fallback={<div> Loading...</div>}>
      <Routes location={location}>
        <Route path={ROUTES.HOME} element={<HomePage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;

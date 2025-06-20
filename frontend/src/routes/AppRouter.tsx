import React, { Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { ROUTES } from "../utils/constants";

const HomePage = React.lazy(() => import("../pages/HomePage"));

const AppRouter: React.FC = () => {
  const location = useLocation();

  return (
    <Suspense fallback={<div> Loading...</div>}>
      <div key={location.pathname} className="relative">
        <Routes location={location}>
          <Route path={ROUTES.HOME} element={<HomePage />} />
        </Routes>
      </div>
    </Suspense>
  );
};

export default AppRouter;

import React, { useEffect, useState, type JSX } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { alertWarning } from "../libs/alerts";
import { ROUTES } from "../utils/constants";

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      alertWarning("You need to log in first.").then(() => {
        setShouldRedirect(true);
      });
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    if (shouldRedirect) {
      return <Navigate to={ROUTES.LOGIN} replace />;
    }
    return null;
  }

  return children;
};

export default PrivateRoute;

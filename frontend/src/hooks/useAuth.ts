import { useCallback, useEffect, useState } from "react";
import type { UserDTO } from "../types/user";

const USER_KEY = "currentUser";

export const useAuth = () => {
  const [user, setUser] = useState<UserDTO | null>(() => {
    const storedUser = localStorage.getItem(USER_KEY);
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = useCallback((userData: UserDTO) => {
    localStorage.setItem(USER_KEY, JSON.stringify(userData));
    setUser(userData);
    window.dispatchEvent(new Event("authChange"));
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(USER_KEY);
    setUser(null);
    window.dispatchEvent(new Event("authChange"));
  }, []);

  const getAuthToken = useCallback(() => {
    if (user?.token) {
      return user.token;
    }
    return null;
  }, [user]);

  useEffect(() => {
    const onAuthChange = () => {
      const storedUser = localStorage.getItem(USER_KEY);
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };
    window.addEventListener("authChange", onAuthChange);
    return () => window.removeEventListener("authChange", onAuthChange);
  }, []);

  const isAuthenticated = !!user?.token;

  return { user, isAuthenticated, login, logout, getAuthToken };
};

"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // ⭐ Initialize AUTH from sessionStorage (no useEffect needed)
  const [isAuthenticated, setIsAuthenticatedState] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("auth") === "true";
    }
    return false;
  });

  // ⭐ Wrapper to save to both state & sessionStorage
  const setIsAuthenticated = (value: boolean) => {
    setIsAuthenticatedState(value);
    sessionStorage.setItem("auth", value ? "true" : "false");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside <AuthProvider>");
  }
  return context;
};

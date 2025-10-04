import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("loggedUser");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    // keep user in sync with localStorage changes (optional)
    const onStorage = () => {
      const raw = localStorage.getItem("loggedUser");
      setUser(raw ? JSON.parse(raw) : null);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const login = (userObj, token) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("loggedUser", JSON.stringify(userObj));
    setUser(userObj);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("loggedUser");
    setUser(null);
  };

  const isAuthenticated = () => !!localStorage.getItem("authToken");

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

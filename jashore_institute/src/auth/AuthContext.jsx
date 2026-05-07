import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [role, setRole] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");
    const storedUsername = localStorage.getItem("username");

    if (token) {
      setIsAuthenticated(true);
      setRole(storedRole);
      setUsername(storedUsername);
    } else {
      setIsAuthenticated(false);
      setRole(null);
      setUsername(null);
    }
  }, []);

  const login = (data) => {
    localStorage.setItem("token", data.access);
    localStorage.setItem("refresh", data.refresh);
    localStorage.setItem("role", data.role);
    localStorage.setItem("username", data.username);

    setIsAuthenticated(true);
    setRole(data.role);
    setUsername(data.username);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    localStorage.removeItem("role");
    localStorage.removeItem("username");

    setIsAuthenticated(false);
    setRole(null);
    setUsername(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        role,
        username,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
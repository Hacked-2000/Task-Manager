import { createContext, useContext, useEffect, useState } from "react";
import { authApi, getErrorMessage } from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const persistSession = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setUser(data.user);
  };

  const register = async (payload) => {
    try {
      const { data } = await authApi.register(payload);
      persistSession(data.data);
      return { success: true };
    } catch (error) {
      return { success: false, message: getErrorMessage(error) };
    }
  };

  const login = async (payload) => {
    try {
      const { data } = await authApi.login(payload);
      persistSession(data.data);
      return { success: true };
    } catch (error) {
      return { success: false, message: getErrorMessage(error) };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

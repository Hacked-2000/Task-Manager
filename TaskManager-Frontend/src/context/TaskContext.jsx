import { createContext, useCallback, useContext, useState } from "react";
import { getErrorMessage, taskApi } from "../services/api";

const TaskContext = createContext(null);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchTasks = useCallback(async (status = "") => {
    setLoading(true);
    setError("");
    try {
      const { data } = await taskApi.getAll(status || undefined);
      setTasks(data.data);
    } catch (err) {
      setError(getErrorMessage(err));
      setTasks([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const createTask = async (payload) => {
    try {
      const { data } = await taskApi.create(payload);
      setTasks((prev) => [...prev, data.data]);
      return { success: true };
    } catch (err) {
      return { success: false, message: getErrorMessage(err) };
    }
  };

  const updateTask = async (id, payload) => {
    try {
      const { data } = await taskApi.update(id, payload);
      setTasks((prev) =>
        prev.map((task) => (task._id === id ? data.data : task))
      );
      return { success: true };
    } catch (err) {
      return { success: false, message: getErrorMessage(err) };
    }
  };

  const deleteTask = async (id) => {
    try {
      await taskApi.remove(id);
      setTasks((prev) => prev.filter((task) => task._id !== id));
      return { success: true };
    } catch (err) {
      return { success: false, message: getErrorMessage(err) };
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        error,
        fetchTasks,
        createTask,
        updateTask,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within TaskProvider");
  }
  return context;
};

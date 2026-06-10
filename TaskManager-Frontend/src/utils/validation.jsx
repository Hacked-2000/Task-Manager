export const validateEmail = (email) => {
  if (!email?.trim()) return "Email is required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Enter a valid email";
  return "";
};

export const validatePassword = (password) => {
  if (!password) return "Password is required";
  if (password.length < 6) return "Password must be at least 6 characters";
  return "";
};

export const validateName = (name) => {
  if (!name?.trim()) return "Name is required";
  if (name.trim().length < 2) return "Name must be at least 2 characters";
  return "";
};

export const validateTaskForm = ({ title, description, dueDate }) => {
  const errors = {};

  if (!title?.trim()) errors.title = "Title is required";
  if (!description?.trim()) errors.description = "Description is required";
  if (!dueDate) errors.dueDate = "Due date is required";

  return errors;
};

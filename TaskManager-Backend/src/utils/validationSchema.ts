import Joi from "joi";

export const registerSchema = Joi.object({
  name: Joi.string().trim().min(2).max(50).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 2 characters",
    "any.required": "Name is required",
  }),
  email: Joi.string().trim().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Enter a valid email address",
    "any.required": "Email is required",
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters",
    "any.required": "Password is required",
  }),
});

export const loginSchema = Joi.object({
  email: Joi.string().trim().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Enter a valid email address",
    "any.required": "Email is required",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Password is required",
    "any.required": "Password is required",
  }),
});

export const createTaskSchema = Joi.object({
  title: Joi.string().trim().min(1).max(100).required().messages({
    "string.empty": "Title is required",
    "any.required": "Title is required",
  }),
  description: Joi.string().trim().min(1).max(500).required().messages({
    "string.empty": "Description is required",
    "any.required": "Description is required",
  }),
  status: Joi.string()
    .valid("todo", "in-progress", "done")
    .default("todo")
    .messages({
      "any.only": "Status must be todo, in-progress, or done",
    }),
  dueDate: Joi.date().iso().greater("now").required().messages({
    "date.base": "Due date must be a valid date",
    "date.greater": "Due date must be in the future",
    "any.required": "Due date is required",
  }),
});

export const updateTaskSchema = Joi.object({
  title: Joi.string().trim().min(1).max(100),
  description: Joi.string().trim().min(1).max(500),
  status: Joi.string().valid("todo", "in-progress", "done").messages({
    "any.only": "Status must be todo, in-progress, or done",
  }),
  dueDate: Joi.date().iso(),
})
  .min(1)
  .messages({
    "object.min": "At least one field is required to update",
  });

export const taskStatusQuerySchema = Joi.object({
  status: Joi.string().valid("todo", "in-progress", "done").messages({
    "any.only": "Status filter must be todo, in-progress, or done",
  }),
});

export const taskIdParamSchema = Joi.object({
  id: Joi.string().hex().length(24).required().messages({
    "string.length": "Invalid task id",
    "any.required": "Task id is required",
  }),
});

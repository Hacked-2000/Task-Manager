import { Router } from "express";
import { login, register } from "../controllers/authController";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../controllers/taskController";
import { authenticate } from "../middleware/auth";
import { validate } from "../middleware/validate";
import {
  createTaskSchema,
  loginSchema,
  registerSchema,
  taskIdParamSchema,
  taskStatusQuerySchema,
  updateTaskSchema,
} from "../utils/validationSchema";

const router = Router();

router.post("/auth/register", validate(registerSchema), register);
router.post("/auth/login", validate(loginSchema), login);

router.post(
  "/tasks",
  authenticate,
  validate(createTaskSchema),
  createTask
);
router.get(
  "/tasks",
  authenticate,
  validate(taskStatusQuerySchema, "query"),
  getTasks
);
router.patch(
  "/tasks/:id",
  authenticate,
  validate(taskIdParamSchema, "params"),
  validate(updateTaskSchema),
  updateTask
);
router.delete(
  "/tasks/:id",
  authenticate,
  validate(taskIdParamSchema, "params"),
  deleteTask
);

export default router;

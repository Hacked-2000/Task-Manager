import { Response } from "express";
import { AuthRequest, TaskStatus } from "../interfaces";
import { Task } from "../models/Task";

export const createTask = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user!.id;
    const { title, description, status, dueDate } = req.body;

    const task = await Task.createTask(userId, {
      title,
      description,
      status: status as TaskStatus,
      dueDate: new Date(dueDate),
    });

    res.status(201).json({
      success: true,
      message: "Task created",
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create task",
    });
  }
};

export const getTasks = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user!.id;
    const status = req.query.status as TaskStatus | undefined;

    const tasks = await Task.findByUser(userId, status);

    res.status(200).json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch tasks",
    });
  }
};

export const updateTask = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user!.id;
    const taskId = req.params.id as string;
    const updates = { ...req.body };

    if (updates.dueDate) {
      updates.dueDate = new Date(updates.dueDate);
    }

    const task = await Task.updateTask(taskId, userId, updates);

    if (!task) {
      res.status(404).json({
        success: false,
        message: "Task not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Task updated",
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update task",
    });
  }
};

export const deleteTask = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user!.id;
    const taskId = req.params.id as string;

    const task = await Task.deleteTask(taskId, userId);

    if (!task) {
      res.status(404).json({
        success: false,
        message: "Task not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Task deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete task",
    });
  }
};

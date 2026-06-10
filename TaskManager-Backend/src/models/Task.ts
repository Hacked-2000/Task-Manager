import mongoose, { Model, Types } from "mongoose";
import { ITask, TaskStatus } from "../interfaces";

interface TaskModel extends Model<ITask> {
  createTask(
    userId: string,
    data: {
      title: string;
      description: string;
      status: TaskStatus;
      dueDate: Date;
    }
  ): Promise<ITask>;
  findByUser(userId: string, status?: TaskStatus): Promise<ITask[]>;
  findByIdForUser(taskId: string, userId: string): Promise<ITask | null>;
  updateTask(
    taskId: string,
    userId: string,
    updates: Partial<{
      title: string;
      description: string;
      status: TaskStatus;
      dueDate: Date;
    }>
  ): Promise<ITask | null>;
  deleteTask(taskId: string, userId: string): Promise<ITask | null>;
}

const taskSchema = new mongoose.Schema<ITask>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["todo", "in-progress", "done"],
      default: "todo",
    },
    dueDate: {
      type: Date,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

taskSchema.statics.createTask = function (
  userId: string,
  data: {
    title: string;
    description: string;
    status: TaskStatus;
    dueDate: Date;
  }
) {
  return this.create({
    ...data,
    user: new Types.ObjectId(userId),
  });
};

taskSchema.statics.findByUser = function (userId: string, status?: TaskStatus) {
  const filter: Record<string, unknown> = {
    user: new Types.ObjectId(userId),
  };

  if (status) {
    filter.status = status;
  }

  return this.find(filter).sort({ dueDate: 1 });
};

taskSchema.statics.findByIdForUser = function (taskId: string, userId: string) {
  return this.findOne({
    _id: new Types.ObjectId(taskId),
    user: new Types.ObjectId(userId),
  });
};

taskSchema.statics.updateTask = function (
  taskId: string,
  userId: string,
  updates: Partial<{
    title: string;
    description: string;
    status: TaskStatus;
    dueDate: Date;
  }>
) {
  return this.findOneAndUpdate(
    {
      _id: new Types.ObjectId(taskId),
      user: new Types.ObjectId(userId),
    },
    { $set: updates },
    { new: true, runValidators: true }
  );
};

taskSchema.statics.deleteTask = function (taskId: string, userId: string) {
  return this.findOneAndDelete({
    _id: new Types.ObjectId(taskId),
    user: new Types.ObjectId(userId),
  });
};

export const Task = mongoose.model<ITask, TaskModel>("Task", taskSchema);

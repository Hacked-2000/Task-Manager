import { Request } from "express";
import { Document, Types } from "mongoose";

export type TaskStatus = "todo" | "in-progress" | "done";

export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITask extends Document {
  _id: Types.ObjectId;
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: Date;
  user: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../interfaces";

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    res.status(401).json({
      success: false,
      message: "Access denied. No token provided.",
    });
    return;
  }

  const token = authHeader.split(" ")[1];
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    res.status(500).json({
      success: false,
      message: "Server configuration error",
    });
    return;
  }

  try {
    const decoded = jwt.verify(token, secret) as {
      id: string;
      email: string;
    };

    req.user = decoded;
    next();
  } catch {
    res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

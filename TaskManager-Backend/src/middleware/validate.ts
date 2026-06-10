import { NextFunction, Request, Response } from "express";
import Joi from "joi";

type ValidationTarget = "body" | "query" | "params";

export const validate =
  (schema: Joi.ObjectSchema, target: ValidationTarget = "body") =>
  (req: Request, res: Response, next: NextFunction): void => {
    const { error, value } = schema.validate(req[target], {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.details.map((detail) => detail.message),
      });
      return;
    }

    req[target] = value;
    next();
  };

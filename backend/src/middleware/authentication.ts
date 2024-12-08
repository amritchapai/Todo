import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { IPayload } from "../types/types";
import jwt from "jsonwebtoken";
import envVariables from "../config/env";

declare global {
  namespace Express {
    interface Request {
      id: mongoose.Types.ObjectId;
    }
  }
}

async function authentication(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const token: string = req.cookies.token;
    console.log(token);
    if (!token) {
      res.status(400).json({
        message: "Token is missing",
        success: false,
      });
      return;
    }
    let payload: IPayload | null = null;
    try {
      payload = jwt.verify(token, envVariables.secretKey) as IPayload;
    } catch (error) {
      res.status(401).json({
        message: "Invalid token",
        success: false,
      });
      return;
    }
    req.id = payload.id;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Authentication failed",
      success: false,
    });
    return;
  }
}

export default authentication;

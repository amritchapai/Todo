import { Request, Response } from "express";
import mongoose from "mongoose";
import Task from "../model/taskModel";
import User, { IUser } from "../model/userModel";

export async function addTask(req: Request, res: Response): Promise<void> {
  try {
    const ownerId: mongoose.Types.ObjectId = req.id;
    const {
      title,
      description,
      deadline,
      category,
    }: {
      title: string | null;
      description: string;
      deadline: Date | null;
      category: string | null;
    } = req.body;
    if (!description) {
      res.status(400).json({
        message: "Description is required",
        status: false,
      });
      return;
    }
    await Task.create({
      ownerId,
      title,
      description,
      deadline,
      category,
    });
    const owner = await User.findById(ownerId);
    
    res.status(201).json({
      message: "Task added successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server side error",
      success: false,
    });
  }
}

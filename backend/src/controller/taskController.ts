import { Request, Response } from "express";
import mongoose from "mongoose";
import Task, { ITask } from "../model/taskModel";
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
    const task: ITask = await Task.create({
      owner: ownerId,
      title,
      description,
      deadline,
      category,
    });
    const owner: IUser | null = await User.findById(ownerId);
    if (!owner) {
      res.status(404).json({
        message: "User not found",
        success: false,
      });
    }
    await User.findByIdAndUpdate(ownerId, {
      $push: {
        tasks: task._id,
      },
    });
    res.status(201).json({
      message: "Task added successfully",
      success: true,
      task,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server side error",
      success: false,
    });
  }
}

//to edit task
export async function editTask(req: Request, res: Response): Promise<void> {
  try {
    const taskId = new mongoose.Types.ObjectId(req.params.id);
    const { title, description, deadline, category } = req.body;

    if (!description) {
      res.status(400).json({
        message: "Description is required",
        status: false,
      });
      return;
    }
    const task: ITask | null = await Task.findById(taskId);
    if (!task) {
      res.status(404).json({
        message: "Task doesn't exist",
        success: false,
      });
      return;
    }
    await Task.findByIdAndUpdate(taskId, {
      $set: {
        title: title,
        description: description,
        deadline: deadline,
        category: category,
      },
    });
    res.status(202).json({
      message: "Update successful",
      success: true,
    });
  } catch (error) {
    console.log(error),
      res.status(500).json({
        message: "Server side error",
        success: false,
      });
  }
}

//to delete task
export async function deleteTask(req: Request, res: Response): Promise<void> {
  try {
    const taskId = new mongoose.Types.ObjectId(req.params.id);
    const taskToDelete: ITask | null = await Task.findByIdAndDelete(taskId);
    if (!taskToDelete) {
      res.status(404).json({
        message: "Task not found",
        status: false,
      });
    }
    res.status(202).json({
      message: "Task deleted",
      status: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server side error",
      success: false,
    });
  }
}

export async function markCompleteTask(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const taskId = new mongoose.Types.ObjectId(req.params.id);
    const taskToMark: ITask | null = await Task.findByIdAndUpdate(taskId, {
      $set:{
        deadline: "",
        completed: true,
      }
    },{new: true});
    if (!taskToMark) {
      res.status(404).json({
        message: "Task not found",
        status: false,
      });
      return;
    }
    res.status(202).json({
      message: "Marked Complete",
      status: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server side error",
      success: false,
    });
  }
}

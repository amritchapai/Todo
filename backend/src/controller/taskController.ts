import { Request, Response } from "express";
import mongoose from "mongoose";
import Task, { ITask } from "../model/taskModel";
import Category, { ICategory } from "../model/categoriesModel";

export async function addTask(req: Request, res: Response): Promise<void> {
  try {
    const ownerId: mongoose.Types.ObjectId = req.id;
    const categoryId = new mongoose.Types.ObjectId(req.params.categoryId);
    const {
      title,
      description,
      deadline,
      priority,
    }: {
      title: string | null;
      description: string;
      deadline: Date | null;
      priority: string | null;
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
      priority,
      category: categoryId
    });
    const category: ICategory | null = await Category.findByIdAndUpdate(
      categoryId,
      {
        $push: {
          tasks: task._id,
        },
      }
    );
    if (!category) {
      res.status(404).json({
        message: "Category doesn't exist",
        success: false,
      });
    }
    res.status(201).json({
      message: "Task added successfully",
      success: true,
      data: task,
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
    const taskId = new mongoose.Types.ObjectId(req.params.taskid);
    const { title, description, deadline, priority } = req.body;

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
    const updatedtask = await Task.findByIdAndUpdate(taskId, {
      $set: {
        title: title,
        description: description,
        deadline: deadline,
        priority: priority,
      },
    });
    res.status(202).json({
      message: "Update successful",
      success: true,
      data: updatedtask
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
    const taskId = new mongoose.Types.ObjectId(req.params.taskid); 
    const taskToDelete: ITask | null = await Task.findByIdAndDelete(taskId);
    if (!taskToDelete) {
      res.status(404).json({
        message: "Task not found",
        success: false,
      });
      return;
    }

    const category: ICategory | null = await Category.findByIdAndUpdate(
      taskToDelete.category,
      {
        $pull: {
          tasks: taskToDelete._id,
        },
      },
      { new: true }
    );

    if (!category) {
      res.status(404).json({
        message: "Category not found",
        success: false,
      });
      return;
    }

    res.status(202).json({
      message: "Task deleted",
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

export async function markCompleteTask(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const taskId = new mongoose.Types.ObjectId(req.params.taskid);
    const taskMark: ITask | null = await Task.findByIdAndUpdate(
      taskId,
      {
        $set: {
          deadline: "",
          completed: true,
        },
      },
      { new: true }
    );
    if (!taskMark) {
      res.status(404).json({
        message: "Task not found",
        success: false,
      });
      return;
    }
    res.status(202).json({
      message: "Marked Complete",
      success: true,
      data: taskMark
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server side error",
      success: false,
    });
  }
}

export async function getAlltasks(req: Request, res: Response):Promise<void>{
  try{

    const ownerId: mongoose.Types.ObjectId = req.id;
    const allTasks: ITask[] = await Task.find({owner: ownerId});
    res.status(200).json({
      message: "all task successful",
      data: allTasks,
      success: true
    })
  }catch(error){
    console.log(error);
    res.status(500).json({
      message: "Server side error",
      success: false,
    });

  }
}

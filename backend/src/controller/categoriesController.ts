import { Request, Response } from "express";
import mongoose from "mongoose";
import Category, { ICategory } from "../model/categoriesModel";
import User, { IUser } from "../model/userModel";
import Task from "../model/taskModel";


//adding category
export async function addCategory(req: Request, res: Response): Promise<void> {
  try {
    const ownerId: mongoose.Types.ObjectId = req.id;
    const { category } = req.body;

    //if category doesnt have name
    if (!category) {
      res.status(400).json({
        message: "Category name is required",
        success: false,
      });
      return;
    }

    //get array of all the categories from this user
    const categories: ICategory[] = await Category.find({ owner: ownerId });

    //check whether same category exist or not
    const existingCategory: ICategory | undefined = categories.find(
      (oneCategory) => oneCategory.categoryName === category
    );
    if (existingCategory) {
      res.status(400).json({
        message: "Category already exists",
        success: false,
      });
      return;
    }
    //create a category
    const newCategory: ICategory = await Category.create({
      owner: ownerId,
      categoryName: category,
      tasks: [],
    });

    //add that category in user categories
    const updatedUser: IUser | null = await User.findByIdAndUpdate(
      ownerId,
      {
        $push: {
          categories: newCategory._id,
        },
      },
      { new: true }
    );
    //if user not found handle it
    if (!updatedUser) {
      await Category.findByIdAndDelete(newCategory._id);
      res.status(404).json({
        message: "User not found",
        success: false,
      });
    }
    res.status(202).json({
      message: "Category added",
      success: true,
      data: newCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server side error",
      success: false,
    });
  }
}

export async function deleteCategory(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const ownerId: mongoose.Types.ObjectId = req.id;
    const categoryId = new mongoose.Types.ObjectId(req.params.categoryId);

    const category: ICategory | null = await Category.findByIdAndDelete(
      categoryId
    );

    //if category is not found
    if (!category) {
      res.status(404).json({
        message: "Category not found",
        success: false,
      });
      return;
    }

    //now delete all the tasks in that category if there
    await Task.deleteMany({ category: categoryId });

    //now pull category from user
    await User.findByIdAndUpdate(ownerId, {
      $pull: {
        categories: categoryId,
      },
    });

    res.status(200).json({
      message: "Deletion successful",
      success: true,
      data: category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "server side error",
      success: false,
    });
  }
}

export async function getAllCategory(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const ownerId: mongoose.Types.ObjectId = req.id;

    //send all category with the tasks
    const allCategory: ICategory[] = await Category.find({
      owner: ownerId,
    }).populate({
      path: "tasks",
      select: "title description deadline completed priority",
    });

    res.status(200).json({
      message: "get all category successful",
      success: true,
      data: allCategory,
    });
  } catch (error) {
    res.status(500).json({
      message: "server side error",
      success: false,
    });
  }
}

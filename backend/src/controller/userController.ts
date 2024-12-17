
import { Request, Response } from "express";
import User, { IUser } from "../model/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import envVariables from "../config/env";
import { IPassUser, IPayload } from "../types/types";

//to register user
export async function addUser(req: Request, res: Response): Promise<void> {
  try {
    const {
      name,
      email,
      password,
    }: {
      name: string;
      email: string;
      password: string;
    } = req.body;
    if (!name || !email || !password) {
      res.status(400).json({
        message: "All field should be filled",
        success: false,
      });
      return;
    }
    //check if already have account
    const findUser: IUser | null = await User.findOne({ email });
    if (findUser) {
      res.status(409).json({
        message: "email already exists",
        success: false,
      });
      return;
    }
    const hashedPassword: string = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashedPassword });
    res.status(201).json({
      message: "User has been created successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Registration failed",
      success: false,
    });
  }
}

//to login
export async function loginUser(req: Request, res: Response): Promise<void> {
  try {
    const {
      email,
      password,
    }: {
      email: string;
      password: string;
    } = req.body;

    if (!email || !password) {
      res.status(400).json({
        message: "All fields should be filled",
        success: false,
      });
      return;
    }
    const loginUser: IUser | null = await User.findOne({ email });
    if (!loginUser) {
      res.status(404).json({
        message: "User does not exist",
        success: false,
      });
      return;
    }
    //compare passwords
    const passwordMatch: boolean = await bcrypt.compare(
      password,
      loginUser.password
    );
    if (!passwordMatch) {
      res.status(404).json({
        message: "Incorrect Password",
        success: false,
      });
      return;
    }
    const payload: IPayload = {
      id: loginUser._id as mongoose.Types.ObjectId,
    };
    //generate the token
    const token = jwt.sign(payload, envVariables.secretKey, {
      expiresIn: "7d",
    });


    const passUser: IPassUser = {
      name: loginUser.name,
      email: loginUser.email,
    };
    //put token in cookie and then pass the cookie
    res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({
        message: "Login successful",
        success: true,
        passUser,
      });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Log in failed",
      success: false,
    });
  }
}

export async function logoutUser (req: Request, res: Response): Promise<void>{
  try {
    //remove the token from cookie
    res.cookie("token", "", {maxAge:0}).json({
      message: "Logout successful",
      success: true
    })
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Logout failed",
      success: false,
    });
  }
}

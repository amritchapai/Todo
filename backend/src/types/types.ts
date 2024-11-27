import mongoose from "mongoose";
import { ITask } from "../model/taskModel";

export interface IPayload {
  id: mongoose.Types.ObjectId;
}

export interface IPassUser {
   name: string;
   email: string;
   tasks: ITask[];
 }

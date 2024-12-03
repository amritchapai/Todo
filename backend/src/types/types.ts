import mongoose from "mongoose";
import { ICategory } from "../model/categoriesModel";

export interface IPayload {
  id: mongoose.Types.ObjectId;
}

export interface IPassUser {
   name: string;
   email: string;
   categories: ICategory[];
 }

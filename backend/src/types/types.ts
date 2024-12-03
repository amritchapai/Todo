import mongoose from "mongoose";

export interface IPayload {
  id: mongoose.Types.ObjectId;
}

export interface IPassUser {
   name: string;
   email: string;
 }

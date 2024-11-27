import mongoose, { Model, Schema } from "mongoose";

export interface IUser extends mongoose.Document{
    name: string,
    email: string,
    password: string,
    tasks: mongoose.Types.ObjectId[]
};

//making schema
const userSchema: Schema<IUser> = new mongoose.Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
  },
  { timestamps: true }
);

//making model
const User: Model<IUser> = mongoose.model<IUser>("User", userSchema)
export default User;

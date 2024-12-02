import mongoose, { Model, Schema } from "mongoose";

export interface ITask extends mongoose.Document{
  owner: mongoose.Types.ObjectId;
  title: string;
  description: string;
  deadline: Date | null;
  category: string;
  completed: boolean;
  priority: string
}

//make schema
const taskSchema: Schema<ITask> = new mongoose.Schema<ITask>({
  owner: {type: mongoose.Schema.ObjectId, required: true},
  title: { type: String, default: "" },
  description: { type: String, required: true },
  deadline: { type: Date, default: null },
  category: { type: String, enum: ["Work", "Personal"], default:"Personal" },
  completed:{type: Boolean, default: false},
  priority: {type: String, enum: ["High", "Medium", "Low"], default:"Low"},
},{timestamps: true});

//make model
const Task: Model<ITask> = mongoose.model<ITask>("Task", taskSchema);
export default Task;
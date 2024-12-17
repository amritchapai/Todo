import mongoose from "mongoose";

export interface ICategory extends mongoose.Document{
    owner: mongoose.Types.ObjectId;
    categoryName: string,
    tasks: mongoose.Types.ObjectId[],
}

//make schema
const categorySchema = new mongoose.Schema<ICategory>({
    owner: {type: mongoose.Schema.Types.ObjectId, required:true, ref:"User"},
    categoryName: {type: String, required: true, unique: true},
    tasks: [{type: mongoose.Schema.Types.ObjectId, ref: "Task"}]
}, {timestamps: true});

//model
const Category = mongoose.model<ICategory>("Category", categorySchema);

export default Category;

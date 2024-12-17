"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
//make schema
const taskSchema = new mongoose_1.default.Schema({
    owner: { type: mongoose_1.default.Schema.ObjectId, required: true },
    title: { type: String, default: "" },
    description: { type: String, required: true },
    deadline: { type: Date, default: null },
    category: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Category" },
    completed: { type: Boolean, default: false },
    priority: { type: String, enum: ["High", "Medium", "Low"], default: "Low" },
}, { timestamps: true });
//make model
const Task = mongoose_1.default.model("Task", taskSchema);
exports.default = Task;

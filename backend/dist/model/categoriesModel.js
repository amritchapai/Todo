"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
//make schema
const categorySchema = new mongoose_1.default.Schema({
    owner: { type: mongoose_1.default.Schema.Types.ObjectId, required: true, ref: "User" },
    categoryName: { type: String, required: true, unique: true },
    tasks: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Task" }]
}, { timestamps: true });
//model
const Category = mongoose_1.default.model("Category", categorySchema);
exports.default = Category;

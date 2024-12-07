"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
;
//making schema
const userSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    categories: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Task" }],
}, { timestamps: true });
//making model
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;

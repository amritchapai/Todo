"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTask = addTask;
exports.editTask = editTask;
const mongoose_1 = __importDefault(require("mongoose"));
const taskModel_1 = __importDefault(require("../model/taskModel"));
const userModel_1 = __importDefault(require("../model/userModel"));
function addTask(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const ownerId = req.id;
            const { title, description, deadline, category, } = req.body;
            if (!description) {
                res.status(400).json({
                    message: "Description is required",
                    status: false,
                });
                return;
            }
            const task = yield taskModel_1.default.create({
                owner: ownerId,
                title,
                description,
                deadline,
                category,
            });
            const owner = yield userModel_1.default.findById(ownerId);
            if (!owner) {
                res.status(404).json({
                    message: "User not found",
                    success: false,
                });
            }
            yield userModel_1.default.findByIdAndUpdate(ownerId, {
                $push: {
                    tasks: task._id,
                },
            });
            res.status(201).json({
                message: "Task added successfully",
                success: true,
                task,
            });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Server side error",
                success: false,
            });
        }
    });
}
function editTask(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const taskId = new mongoose_1.default.Types.ObjectId(req.params.id);
            const { title, description, deadline, category } = req.body;
            if (!description) {
                res.status(400).json({
                    message: "Description is required",
                    status: false,
                });
                return;
            }
            const task = yield taskModel_1.default.findById(taskId);
            if (!task) {
                res.status(404).json({
                    message: "Task doesn't exist",
                    success: false,
                });
                return;
            }
            yield taskModel_1.default.findByIdAndUpdate(taskId, {
                $set: {
                    title: title,
                    description: description,
                    deadline: deadline,
                    category: category,
                },
            });
            res.status(202).json({
                message: "Update successful",
                success: true,
            });
        }
        catch (error) {
            console.log(error),
                res.status(500).json({
                    message: "Server side error",
                    success: false,
                });
        }
    });
}

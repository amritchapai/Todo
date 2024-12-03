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
exports.deleteTask = deleteTask;
exports.markCompleteTask = markCompleteTask;
exports.getAlltasks = getAlltasks;
const mongoose_1 = __importDefault(require("mongoose"));
const taskModel_1 = __importDefault(require("../model/taskModel"));
const categoriesModel_1 = __importDefault(require("../model/categoriesModel"));
function addTask(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const ownerId = req.id;
            const categoryId = new mongoose_1.default.Types.ObjectId(req.params.categoryId);
            const { title, description, deadline, priority, } = req.body;
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
                priority,
            });
            const category = yield categoriesModel_1.default.findByIdAndUpdate(categoryId, {
                $push: {
                    tasks: task._id,
                },
            });
            if (!category) {
                res.status(404).json({
                    message: "Category doesn't exist",
                    success: false,
                });
            }
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
//to edit task
function editTask(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const taskId = new mongoose_1.default.Types.ObjectId(req.params.taskid);
            const { title, description, deadline, priority } = req.body;
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
                    priority: priority,
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
//to delete task
function deleteTask(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const taskId = new mongoose_1.default.Types.ObjectId(req.params.id);
            const taskToDelete = yield taskModel_1.default.findByIdAndDelete(taskId);
            if (!taskToDelete) {
                res.status(404).json({
                    message: "Task not found",
                    status: false,
                });
                return;
            }
            const category = yield categoriesModel_1.default.findByIdAndUpdate(taskToDelete.category, {
                $pull: {
                    tasks: taskToDelete._id,
                },
            }, { new: true });
            if (!category) {
                res.status(404).json({
                    message: "Category not found",
                    status: false,
                });
                return;
            }
            res.status(202).json({
                message: "Task deleted",
                status: true,
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
function markCompleteTask(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const taskId = new mongoose_1.default.Types.ObjectId(req.params.taskid);
            const taskToMark = yield taskModel_1.default.findByIdAndUpdate(taskId, {
                $set: {
                    deadline: "",
                    completed: true,
                },
            }, { new: true });
            if (!taskToMark) {
                res.status(404).json({
                    message: "Task not found",
                    status: false,
                });
                return;
            }
            res.status(202).json({
                message: "Marked Complete",
                status: true,
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
function getAlltasks(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const ownerId = req.id;
            const allTasks = yield taskModel_1.default.find({ owner: ownerId });
            res.status(200).json({
                message: "all task successful",
                allTasks: allTasks,
                success: true
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

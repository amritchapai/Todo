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
            yield taskModel_1.default.create({
                ownerId,
                title,
                description,
                deadline,
                category,
            });
            const owner = yield userModel_1.default.findById(ownerId);
            res.status(201).json({
                message: "Task added successfully",
                success: true,
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

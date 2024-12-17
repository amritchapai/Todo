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
exports.addCategory = addCategory;
exports.deleteCategory = deleteCategory;
exports.getAllCategory = getAllCategory;
const mongoose_1 = __importDefault(require("mongoose"));
const categoriesModel_1 = __importDefault(require("../model/categoriesModel"));
const userModel_1 = __importDefault(require("../model/userModel"));
const taskModel_1 = __importDefault(require("../model/taskModel"));
function addCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const ownerId = req.id;
            const { category } = req.body;
            if (!category) {
                res.status(400).json({
                    message: "Category name is required",
                    success: false,
                });
                return;
            }
            //get array of all the categories from this user
            const categories = yield categoriesModel_1.default.find({ owner: ownerId });
            //check whether same category exist or not
            const existingCategory = categories.find((oneCategory) => oneCategory.categoryName === category);
            if (existingCategory) {
                res.status(400).json({
                    message: "Category already exists",
                    success: false,
                });
                return;
            }
            //create a category
            const newCategory = yield categoriesModel_1.default.create({
                owner: ownerId,
                categoryName: category,
                tasks: [],
            });
            //add that category in user categories
            const updatedUser = yield userModel_1.default.findByIdAndUpdate(ownerId, {
                $push: {
                    categories: newCategory._id,
                },
            }, { new: true });
            //if user not found handle it
            if (!updatedUser) {
                yield categoriesModel_1.default.findByIdAndDelete(newCategory._id);
                res.status(404).json({
                    message: "User not found",
                    success: false,
                });
            }
            res.status(202).json({
                message: "Category added",
                success: true,
                data: newCategory,
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
function deleteCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const ownerId = req.id;
            const categoryId = new mongoose_1.default.Types.ObjectId(req.params.categoryId);
            const category = yield categoriesModel_1.default.findByIdAndDelete(categoryId);
            //if category is not found
            if (!category) {
                res.status(404).json({
                    message: "Category not found",
                    success: false,
                });
                return;
            }
            //now delete all the tasks in that category if there
            yield taskModel_1.default.deleteMany({ category: categoryId });
            //now pull category from user
            yield userModel_1.default.findByIdAndUpdate(ownerId, {
                $pull: {
                    categories: categoryId,
                },
            });
            res.status(200).json({
                message: "Deletion successful",
                success: true,
                data: category,
            });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                message: "server side error",
                success: false,
            });
        }
    });
}
function getAllCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const ownerId = req.id;
            const allCategory = yield categoriesModel_1.default.find({
                owner: ownerId,
            }).populate({
                path: "tasks",
                select: "title description deadline completed priority",
            });
            res.status(200).json({
                message: "get all category successful",
                success: true,
                data: allCategory,
            });
        }
        catch (error) {
            res.status(500).json({
                message: "server side error",
                success: false,
            });
        }
    });
}

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
exports.addUser = addUser;
exports.loginUser = loginUser;
const taskModel_1 = __importDefault(require("./../model/taskModel"));
const userModel_1 = __importDefault(require("../model/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = __importDefault(require("../config/env"));
//to register user
function addUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, email, password, } = req.body;
            if (!name || !email || !password) {
                res.status(400).json({
                    message: "All field should be filled",
                    success: false,
                });
                return;
            }
            const findUser = yield userModel_1.default.findOne({ email });
            if (findUser) {
                res.status(409).json({
                    message: "email already exists",
                    success: false,
                });
                return;
            }
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            yield userModel_1.default.create({ name, email, password: hashedPassword });
            res.status(201).json({
                message: "User has been created successfully",
                success: true,
            });
        }
        catch (error) {
            console.log(error);
        }
    });
}
//to login
function loginUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password, } = req.body;
            if (!email || !password) {
                res.status(400).json({
                    message: "All fields should be filled",
                    success: false,
                });
                return;
            }
            const loginUser = yield userModel_1.default.findOne({ email });
            if (!loginUser) {
                res.status(404).json({
                    message: "User does not exist",
                    success: false,
                });
                return;
            }
            const passwordMatch = yield bcrypt_1.default.compare(password, loginUser.password);
            if (!passwordMatch) {
                res.status(404).json({
                    message: "Incorrect Password",
                    success: false,
                });
                return;
            }
            const payload = {
                id: loginUser._id,
            };
            const token = jsonwebtoken_1.default.sign(payload, env_1.default.secretKey, {
                expiresIn: "1d",
            });
            const populatedTasks = (yield Promise.all(loginUser.tasks.map((taskId) => __awaiter(this, void 0, void 0, function* () {
                const task = yield taskModel_1.default.findById(taskId);
                return task;
            })))).filter((task) => task !== null);
            const passUser = {
                name: loginUser.name,
                email: loginUser.email,
                tasks: populatedTasks,
            };
            res
                .cookie("token", token, {
                httpOnly: true,
                sameSite: "strict",
                maxAge: 3600000,
            })
                .json({
                message: "Login successful",
                success: true,
                passUser,
            });
        }
        catch (error) { }
    });
}

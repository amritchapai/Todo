"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controller/userController");
const route = express_1.default.Router();
route.post("/signup", userController_1.addUser);
route.post("/login", userController_1.loginUser);
exports.default = route;

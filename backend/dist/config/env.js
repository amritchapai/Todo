"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const envVariables = {
    port: process.env.PORT ? Number(process.env.PORT) : 8000,
    mongoURI: process.env.mongoURI ||
        "mongodb+srv://amrit:amrit123@todo.yb0qe.mongodb.net/?retryWrites=true&w=majority&appName=ToDo",
    saltRounds: process.env.SALTROUNDS ? Number(process.env.SALTROUNDS) : 10,
    secretKey: process.env.SECRETKEY || "kdgjoejgoije"
};
exports.default = envVariables;

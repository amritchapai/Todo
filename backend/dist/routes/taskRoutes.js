"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authentication_1 = __importDefault(require("../middleware/authentication"));
const taskController_1 = require("../controller/taskController");
const router = express_1.default.Router();
router.post("/addtask/:categoryId", authentication_1.default, taskController_1.addTask);
router.post("/edittask/:taskid", authentication_1.default, taskController_1.editTask);
router.post("/markcomplete/:id", authentication_1.default, taskController_1.markCompleteTask),
    router.post("/deletetask/:taskid", authentication_1.default, taskController_1.deleteTask),
    router.get("/getalltask", authentication_1.default, taskController_1.getAlltasks);
exports.default = router;

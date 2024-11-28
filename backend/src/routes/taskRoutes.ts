import express from "express";
import authentication from "../middleware/authentication";
import { addTask, deleteTask, editTask, markCompleteTask } from "../controller/taskController";

const router = express.Router();


router.post("/addtask", authentication, addTask);
router.post("/edittask/:id", authentication, editTask);
router.post("/markcomplete/:id", authentication, markCompleteTask),
router.post("/deletetask/:id", authentication, deleteTask)

export default router;
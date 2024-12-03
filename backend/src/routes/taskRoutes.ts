import express from "express";
import authentication from "../middleware/authentication";
import { addTask, deleteTask, editTask, getAlltasks, markCompleteTask } from "../controller/taskController";

const router = express.Router();


router.post("/addtask/:categoryId", authentication, addTask);
router.post("/edittask/:taskid", authentication, editTask);
router.post("/markcomplete/:id", authentication, markCompleteTask),
router.post("/deletetask/:taskid", authentication, deleteTask),
router.get("/getalltask", authentication, getAlltasks)

export default router;
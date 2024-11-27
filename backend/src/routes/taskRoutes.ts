import express from "express";
import authentication from "../middleware/authentication";
import { addTask } from "../controller/taskController";

const router = express.Router();


router.post("/addtask", authentication, addTask);

export default router;
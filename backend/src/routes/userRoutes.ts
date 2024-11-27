import express from "express";
import { addUser, loginUser } from "../controller/userController";

const route = express.Router();

route.post("/signup", addUser);
route.post("/login", loginUser);

export default route;

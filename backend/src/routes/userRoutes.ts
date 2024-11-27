import express from "express";
import { addUser, loginUser, logoutUser } from "../controller/userController";

const route = express.Router();

route.post("/signup", addUser);
route.post("/login", loginUser);
route.post("/logout", logoutUser);

export default route;

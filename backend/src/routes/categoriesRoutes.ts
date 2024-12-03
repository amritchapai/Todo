import express from "express";
import {
  addCategory,
  deleteCategory,
  getAllCategory,
} from "../controller/categoriesController";
import authentication from "../middleware/authentication";

const route = express.Router();

route.post("/addCategory", authentication, addCategory);
route.post("/deleteCategory/:categoryId", authentication, deleteCategory);
route.get("/getallcategory", authentication, getAllCategory);

export default route;

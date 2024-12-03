"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const categoriesController_1 = require("../controller/categoriesController");
const authentication_1 = __importDefault(require("../middleware/authentication"));
const route = express_1.default.Router();
route.post("/addCategory", authentication_1.default, categoriesController_1.addCategory);
route.post("/deleteCategory/:categoryId", authentication_1.default, categoriesController_1.deleteCategory);
route.get("/getallcategory", authentication_1.default, categoriesController_1.getAllCategory);
exports.default = route;

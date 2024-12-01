"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const taskRoutes_1 = __importDefault(require("./routes/taskRoutes"));
const db_1 = __importDefault(require("./config/db"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(userRoutes_1.default);
app.use(taskRoutes_1.default);
//server
const PORT = 8000;
app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`);
    (0, db_1.default)();
});

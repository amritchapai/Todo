"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const taskRoutes_1 = __importDefault(require("./routes/taskRoutes"));
const categoriesRoutes_1 = __importDefault(require("./routes/categoriesRoutes"));
const db_1 = __importDefault(require("./config/db"));
const cors_1 = __importDefault(require("cors"));
const env_1 = __importDefault(require("./config/env"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    optionsSuccessStatus: 200,
    credentials: true,
}));
app.use("/api/", userRoutes_1.default);
app.use("/api/", taskRoutes_1.default);
app.use("/api/", categoriesRoutes_1.default);
//server
app.listen(env_1.default.port, () => {
    console.log(`app listening on port ${env_1.default.port}`);
    (0, db_1.default)();
});

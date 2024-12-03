import express from "express";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoutes";
import taskRouter from "./routes/taskRoutes";
import categoryRouter from "./routes/categoriesRoutes";
import dbConnect from "./config/db";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/api/", userRouter);
app.use("/api/", taskRouter);
app.use("/api/", categoryRouter);

//server
const PORT: number = 8000;
app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
  dbConnect();
});

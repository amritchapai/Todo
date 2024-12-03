import express from "express";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoutes";
import taskRouter from "./routes/taskRoutes";
import categoryRouter from "./routes/categoriesRoutes";
import dbConnect from "./config/db";
import cors from "cors";
import envVariables from "./config/env";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    optionsSuccessStatus: 200,
    credentials: true,
  })
);
app.use("/api/", userRouter);
app.use("/api/", taskRouter);
app.use("/api/", categoryRouter);


//server
app.listen(envVariables.port, () => {
  console.log(`app listening on port ${envVariables.port}`);
  dbConnect();
});

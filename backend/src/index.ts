import express from "express";
import cookieParser from "cookie-parser"
import userRouter from "./routes/userRoutes"
import taskRouter from "./routes/taskRoutes";
import dbConnect from "./config/db";

const app = express();

app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))
app.use(userRouter);
app.use(taskRouter);

//server
const PORT: number = 8000;
app.listen(PORT, ()=>{
        console.log(`app listening on port ${PORT}`)
        dbConnect();
})
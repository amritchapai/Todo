import express from "express";
import cookieParser from "cookie-parser"
import userRouter from "./routes/userRoutes"
import dbConnect from "./config/db";

const app = express();

app.use(express.json());
app.use(cookieParser())
app.use(userRouter)
app.use(express.urlencoded({extended: true}))

//server
const PORT: number = 8000;
app.listen(PORT, ()=>{
        console.log(`app listening on port ${PORT}`)
        dbConnect();
})
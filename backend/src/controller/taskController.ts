import { Request, Response } from "express";
import mongoose from "mongoose";


export async function addPost(req: Request, res:Response):Promise<void>{
try {
    const ownerId: mongoose.Types.ObjectId = req.id;
    
} catch (error) {
    console.log("error");
    
}
}
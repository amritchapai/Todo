import mongoose from "mongoose";
import envVariables from "./env";

async function dbConnect(): Promise<void> {
  try {
    await mongoose.connect(envVariables.mongoURI);
    console.log("DB connection successful");
  } catch (error) {
    console.log(error);
  }
}

export default dbConnect;

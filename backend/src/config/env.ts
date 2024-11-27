import dotenv from "dotenv";

dotenv.config();

interface Ivariables {
  port: number;
  mongoURI: string;
  saltRounds: number;
  secretKey: string
}
const envVariables: Ivariables = {
  port: process.env.PORT ? Number(process.env.PORT) : 8000,
  mongoURI:
    process.env.mongoURI ||
    "mongodb+srv://amrit:amrit123@todo.yb0qe.mongodb.net/?retryWrites=true&w=majority&appName=ToDo",
  saltRounds: process.env.SALTROUNDS? Number(process.env.SALTROUNDS) : 10,
  secretKey: process.env.SECRETKEY || "kdgjoejgoije"
};

export default envVariables;

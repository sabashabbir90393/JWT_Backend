import express from "express";
import dotenv from "dotenv";
import UserRoute from "./Routes/user.js";
import { connectDB } from "./Utils/mongodb.js";
import cors from "cors";
import { signJWT, verifyJWT } from "./Utils/jwt.js";
import user from "./model/user.js";
import { hashPassword, comparePassword } from "./Utils/bcrypt.js";


dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/user", UserRoute);

app.listen(5050, () => {
  console.log("Server is running on port 5050");
});

const plainPassword = "123456789";

const hashedPassword = await hashPassword(plainPassword);

console.log("Plain Password:", plainPassword);
console.log("Hashed Password:", hashedPassword);

console.log(await comparePassword("123456789", hashedPassword));
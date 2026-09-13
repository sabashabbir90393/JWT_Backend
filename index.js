import express from "express";
import dotenv from "dotenv";

import { connectDB } from "./Utils/mongodb.js";
import cors from "cors";

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.listen(5050, () => {
  console.log("Server is running on port 5050");
});

import mongoose from "mongoose";
 import dotenv from "dotenv";
import dns from "node:dns/promises";

dns.setServers(["1.1.1.1", "8.8.8.8"])

 dotenv.config();
 async function connectDB() {
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("MongoDB connected");

    }catch(error){
        console.log("MongoDB connection Error",error);
    process.exit(1);
    }
    
 }
 export{connectDB};















/* import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.log("MongoDB Connection Error:", error.message);
  }
}; */
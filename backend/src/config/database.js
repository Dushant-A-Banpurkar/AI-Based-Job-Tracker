import mongoose from "mongoose";
import * as dotenv from  "dotenv"
dotenv.config();
import env from "./env.js";
const connectMongoDB=async()=>{
    try {
        if(!process.env.MONGODB_URI){
            console.log("mongodburi")
            throw new Error("MONGODBURI is missing in environment variables")
        }
        const connect=await mongoose.connect(process.env.MONGODB_URI,{
            maxPoolSize:10,
            minPoolSize:1,
            serverSelectionTimeoutMS:30000,
            socketTimeoutMS:45000,
            family:4
        });
        console.log(`🚀 MongoDB Connected: ${connect.connection.host}`);

        mongoose.connection.on("conncected",()=>{
            console.log("📡 MongoDB event: connected");
        });

         mongoose.connection.on("error", (err) => {
      console.error("🔥 MongoDB event: connection error ->", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("⚠️ MongoDB event: disconnected");
    });

    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      console.log("🛑 MongoDB closed on app termination");
      process.exit(0);
    });

    } catch (error) {
        console.log("❌ Sommething went wrong on mongodb connection ",error);
        process.exit(1);
    }
}

export default connectMongoDB;
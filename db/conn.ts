import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectionString: string = process.env.MONGODB_URI as string + "/" + process.env.DB_TEST as string;
// const db: string = process.env.DB as string
// let dbInstance;

export default async function connectToDatabase(): Promise<void> {
  try {
    await mongoose.connect(connectionString);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB Atlas:", error);
  }
}

export async function closeDatabaseConnection(): Promise<void> {
  try {
    await mongoose.connection.close();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.log("Error disconnecting from MongoDB:", error);
  }
}

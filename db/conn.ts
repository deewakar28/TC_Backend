import { Db, MongoClient } from "mongodb"
require('dotenv').config()

const connectionString: string = process.env.MONGODB_URI as string
console.log(connectionString);
const db: string = process.env.DB as string
const client = new MongoClient(connectionString)


let dbInstance: Db | null = null;

export default async function connectToDatabase(): Promise<Db | null> {
  if (!dbInstance) {
    try {
      await client.connect();
      console.log("Connected to MongoDB");
      dbInstance = client.db(db);
    } catch (e) {
      console.error("Error connecting to MongoDB Atlas:", e);
    }
  }

  return dbInstance;
}

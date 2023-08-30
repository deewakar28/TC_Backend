const { MongoClient } = require("mongodb")
require('dotenv').config()

const connectionString = process.env.ATLAS_URI
const db = process.env.DB
const client = new MongoClient(connectionString)

let dbInstance = null;

async function connectToDatabase() {
  if (!dbInstance) {
    try {
      await client.connect();
      console.log("Connected to MongoDB Atlas");
      dbInstance = client.db(db);
    } catch (e) {
      console.error("Error connecting to MongoDB Atlas:", e);
    }
  }

  return dbInstance;
}

module.exports = {
  connectToDatabase,
};
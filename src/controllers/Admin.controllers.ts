import mongoose from "mongoose";
import { CustomRequest } from "..";
import { Response } from "express";

const fetchAll = async (req: CustomRequest, res: Response) => {
  try {
    const event = req.query.event;
    if (!event) {
      return res.status(405).json({ ok: false, message: "Please provide a valid event name" });
    }
    const collectionName = event === "BGMI" ? event + "_Registration" : event + "_registration";
    const collection = mongoose.connection.db.collection(collectionName);
    const response = await collection.find({}).toArray();
    return res.status(200).json({ ok: true, message: response });
  }
  catch (error) {
    return res.status(500).json({ ok: false, message: "Internal server error", error: error });
  }
};

export { fetchAll };
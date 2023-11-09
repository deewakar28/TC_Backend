import { CustomRequest } from "..";
import { Response } from "express";

const fetchAll = async (req: CustomRequest, res: Response) => {
  const db = req.db!;
  const event = req.query.event;
  const collection = event === "BGMI" ? event + "_Registration" : event + "_registration";
  let data = db.collection(collection).find({})
  const response = await data.toArray();
  return res.status(200).json({ ok: true, message: response })
}

export { fetchAll };
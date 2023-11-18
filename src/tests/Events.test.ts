import request from "supertest";
import app from "..";
import mongoose from "mongoose";
import connectToDatabase, { closeDatabaseConnection } from "../db/conn";
import dotenv from "dotenv";
dotenv.config();

beforeEach(async () => {
  await mongoose.disconnect();
  await connectToDatabase();
});

afterEach(async () => {
  await closeDatabaseConnection();
});

describe("GET /api/v2/fetchAll", () => {
  
  it("should return all event registration details", async () => {
    const res = await request(app).get("/api/v2/fetchAll?event=BGMI");
    if (res.statusCode !== 200) {
      console.error(res.body.message);
    }
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBeDefined();
  });
});

import express, { Request, Response, NextFunction } from "express";
import rateLimit from "express-rate-limit";
import cors from "cors";
import bodyParser from "body-parser";
import connectToDatabase from "./db/conn";
import { Db } from "mongodb";
import admin from "firebase-admin";
import VigyaanRoutes from "./routes/Vigyaan.route";
import EventRoutes from "./routes/Event.route";
import AdminRoutes from "./routes/Admin.route";

const app: express.Application = express();
const PORT: number = 5000;

// app.set("trust proxy", true);

// const limiter = rateLimit({
//   max: 10,
//   windowMs: 60 * 1000,
//   // message: "Too many request from this IP",
//   handler: (req, res) => {
//     res.status(429).json({
//       error: "Rate limit exceeded",
//       message: "Too many requests from this IP",
//     });
//   },
// });

// app.use(limiter);
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// const admin = require('firebase-admin')
// const serviceAccount = require(process.env.FIREBASE_LOCATION as string);
const firebaseKeys: string = process.env.FIREBASE_LOCATION as string;
// const serviceAccount = import(firebaseKeys);
// const firebaseAdmin = admin.initializeApp({
// 	credential: admin.credential.cert(serviceAccount),
// 	storageBucket: "technocracy-97aab.appspot.com",
// });

let firebaseAdmin: admin.app.App;
const initializeFirebase = async () => {
  try {
    const serviceAccount = await import(firebaseKeys);
    const firebaseAdminConfig: admin.AppOptions = {
      credential: admin.credential.cert(serviceAccount),
      storageBucket: "technocracy-97aab.appspot.com",
    };
    firebaseAdmin = admin.initializeApp(firebaseAdminConfig);
    console.log("Firebase initialized successfully");
  } catch (error) {
    console.error(`Error initializing Firebase: ${error}`);
  }
};

initializeFirebase();
export interface CustomRequest extends Request {
  db?: Db | null;
  admin?: admin.app.App;
}

try {
  if (process.env.NODE_ENV !== "test") {
    connectToDatabase();
  }
} catch (error) {
  console.error("Error connecting to the database:", error);
}

app.use((req: CustomRequest, res: Response, next: NextFunction) => {
  req.admin = firebaseAdmin;
  next();
});

app.get("/api/2024", (req: Request, res: Response) => {
  res.send("Server running successfully");
});

app.use("/api/2024", VigyaanRoutes);
app.use("/api/2024", EventRoutes);
app.use("/api/2024", AdminRoutes);

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default app;

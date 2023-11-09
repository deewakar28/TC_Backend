import express, { Request, Response, NextFunction } from "express";
import cors from 'cors';
import bodyParser from 'body-parser';
import connectToDatabase from './db/conn';
import { Db } from "mongodb";
import admin from 'firebase-admin';
import VigyaanRoutes from './routes/VigyaanRoutes';
import EventRoutes from './routes/EventRoutes';
import AdminRoutes from './routes/AdminRoutes';

const app: express.Application = express();

const PORT: number = 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// const admin = require('firebase-admin')
const serviceAccount: string = require(process.env.FIREBASE_LOCATION as string)
const firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'technocracy-97aab.appspot.com',
})

export interface CustomRequest extends Request {
  db?: Db | null;
  admin?: admin.app.App;
}

connectToDatabase()
  .then((db) => {
    app.use((req: CustomRequest, res: Response, next: NextFunction) => {
      req.db = db;
      req.admin = firebaseAdmin;
      next();
    });

    app.get("/server", (req: Request, res: Response) => {
      res.send("Server running successfully");
    });

    app.use(VigyaanRoutes);
    app.use(EventRoutes);
    app.use(AdminRoutes);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });

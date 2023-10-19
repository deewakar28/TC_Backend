const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser')
const { MongoClient } = require("mongodb");
const VigyaanRoutes = require('./routes/VigyaanRoutes')
const EventRoutes = require('./routes/EventRoutes')
const AdminRoutes = require('./routes/AdminRoutes')
const { connectToDatabase } = require('./db/conn')
const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json())
app.use(bodyParser.json())

const admin = require('firebase-admin')
const serviceAccount = require(process.env.FIREBASE_LOCATION)
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'technocracy-97aab.appspot.com',
})

connectToDatabase()
  .then((db) => {
    app.use((req, res, next) => {
      req.db = db;
      req.admin = admin;
      next();
    });

    app.get("/server", (req, res) => {
      res.send("Hi, I am the server, the most powerful.");
    });

    app.use(VigyaanRoutes)
    app.use(EventRoutes)
    app.use(AdminRoutes)

    const PORT = 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });

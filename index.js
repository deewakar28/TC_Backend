const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser')
const { MongoClient } = require("mongodb");
const VigyaanRoutes = require('./routes/VigyaanRoutes')
const { connectToDatabase } = require('./db/conn')
const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json())
app.use(bodyParser.json())

connectToDatabase()
  .then((db) => {
    app.use((req, res, next) => {
      req.db = db;
      next();
    });
    
    app.get("/server", (req, res) => {
      res.send("Hi, I am the server, the most powerful.");
    });
    
    app.use(VigyaanRoutes)

    const PORT = 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });

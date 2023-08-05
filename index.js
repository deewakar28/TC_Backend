const express = require("express");
const mongoose = require("mongoose");
const env = require("dotenv");
const cors = require("cors");
env.config();
const postRoutes = require("./routes/post");
const app = express();
const port = 5000;
app.use(express.json());
app.use(postRoutes);
app.use(cors());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.DBURL, { dbName: "Aavartan2023" });
const db = mongoose.connection;
db.on("error", (err) => {
  console.log(err);
});
db.once("open", () => {
  console.log("Connected to Database!");
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port || process.env.PORT, () => {
  console.log(`Server running on port ${port}`);
});

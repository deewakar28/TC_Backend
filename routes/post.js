const express = require("express");
const app = express();
const e1Model = require("../models/event1")
const e2Model = require("../models/event2");
const e3Model = require("../models/event3");

app.post("/register_e1", async(req, res) => {
  const student = new e1Model(req.body);
   try {
    await student.save();
    res.send(student);
   } catch (err) {
    res.status(500).send(err);
   }
})

app.post("/register_e2", async (req, res) => {
  const student = new e2Model(req.body);
  console.log(req);
  try {
    await student.save();
    res.send(student);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/register_e3", async (req, res) => {
  const student = new e3Model(req.body);

  try {
    await student.save();
    res.send(student);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = app;

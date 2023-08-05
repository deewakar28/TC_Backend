const mongoose = require("mongoose");

const eve1Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  roll: {
    type: String,
    required: true,
    unique: true,
  },
  branch: {
    type: String,
    lowercase: true,
  },
  semester: {
    type: Number,
    required: true,
  },
});

const event1 = mongoose.model("Event1", eve1Schema, "E1");

module.exports = event1;

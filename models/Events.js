const mongoose = require("mongoose");

const RoboSoccerSchema = new mongoose.Schema({
  Team_name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  Leader_name: {
    type: String,
    required: true,
    trim: true
  },
  Leader_whatsapp: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  Leader_branch: {
    type: String,
    required: true,
    trim: true
  },
});

const RoboSoccerModel = mongoose.model("RoboSoccer", RoboSoccerSchema, "RoboSoccer_registration");

module.exports = { RoboSoccerModel };
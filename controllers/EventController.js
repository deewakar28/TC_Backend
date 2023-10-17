const { RoboSoccerModel } = require("../models/Events");

const TerrainTreader = async (db, data, res) => {
  try {
    const collection = db.collection('terrainTreader_registration');
    const present = await collection.findOne({ "Team_name": data['Team_name'] });
    const present1 = await collection.findOne({ "Leader_whatsapp": data['Leader_whatsapp'] });
    if (!present && !present1) {
      await collection.insertOne(data);
      return res.status(200).json({ ok: true, message: "Registered Successfully" })
    }
    else {
      if (present) return res.status(400).json({ ok: false, message: "Team name is already taken" })
      return res.status(400).json({ ok: false, message: "Member with same whatsapp number exists" })
    }
  }
  catch (error) {
    return res.status(500).json({ ok: false, message: "Internal Server Error", error: error })
  }
}

const RoboSoccer = async (db, data, res) => {
  try {
    const formData = new RoboSoccerModel(data)
    await formData.validate()

    const coll = db.collection('RoboSoccer_registration');
    const teamNamePresent = await coll.findOne({"Team_name": data.Team_name});
    if (teamNamePresent) {
      return res.status(400).json({ ok: false, message: "Team name is already taken" });
    }
    const leaderPresent = await coll.findOne({"Leader_whatsapp": data.Leader_whatsapp});
    if (leaderPresent) {
      return res.status(400).json({ ok: false, message: "Member with same whatsapp number exists" });
    }
    const result = await coll.insertOne(formData.toObject());
    if (result.acknowledged) {
      return res.status(200).json({ok: true, message: "Registered Successfully"});
    }
    else {
      return res.status(400).json({ok: false, message: "Couldn't Register"});
    }
  }
  catch (error) {
    return res.status(500).json({ ok: false, message: "Internal Server Error", error: error })
  }
}

const Register = async (req, res) => {
  const event = req.query.event;
  const db = req.db
  const data = req.body;

  if (event === "terrainTreader") {
    await TerrainTreader(db, data, res);
  }
  else if (event === "RoboSoccer") {
    await RoboSoccer(db, data, res);
  }
  else return res.status(200);
}

module.exports = { Register };
const TerrainTreader = async (db, data, res) => {
  try {
    const collection = db.collection('terrainTreader_registration');
    const present = await collection.findOne({ "Team_name": data['Team_name'] });
    if (!present) {
      await collection.insertOne(data);
      return res.status(200).json({ ok: true, message: "Registered Successfully" })
    }
    else {
      return res.status(400).json({ ok: false, message: "Team name is already taken" })
    }
  }
  catch (error) {
    return res.status(500).json({ ok: false, message: "Internal Server Error", error: error})
  } 
}

const Register = async (req, res) => {
  const event = req.query.event;
  const db = req.db
  const data = req.body;

  if (event === "terrainTreader") {
    await TerrainTreader(db, data, res);
  }
  else return res.status(200);
}

module.exports = { Register };
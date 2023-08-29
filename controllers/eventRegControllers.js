const vigyanReg = async (req, res) => {
  const data = req.body
  const db = req.db

  try {
    const collection = db.collection("vigyaan_registration")
    const already = await collection.findOne({ "Team_name": data.Team_name })
    if (!already) {
      await collection.insertOne(data)
      const present = await collection.findOne(data)
      if (present) {
        res.status(200).json({ ok: true, message: "Registered Successfully" })
      }
      else {
        res.status(400).json({ ok: false, message: "Couldn't Register" })
      }
    }
    else {
      res.status(200).json({ ok: false, message: "The Team name is already taken" })
    }
  }
  catch (err) {
    res.status(500).json({ ok: false, message: "Internal Server Error", error: err })
  }
}

module.exports = { vigyanReg }
const fetchAll = async (req, res) => {
  const db = req.db;
  const event = req.query.event;
  const collection = (event === "BGMI" || event === "MechanicalJunkyard" || event === "Hydrolift") ? event + "_Registration" : event + "_registration";
  let data = await db.collection(collection).find({})
  data = await data.toArray();
  return res.status(200).json({ ok: true, message: data })
}

module.exports = { fetchAll };
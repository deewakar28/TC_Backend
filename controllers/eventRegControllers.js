const admin = require('firebase-admin')
const serviceAccount = require('../utils/technocracy-firebase.json')
require('dotenv').config()

const vigyaanAbstract = async (req, res) => {
  const data = req.body
  const db = req.db
  const collection = db.collection('vigyaan_registration')
  const present = await collection.findOne({ "Team_name": data.Team_name })
  const file = req.file

  if (!file) {
    if (present) {
      await collection.deleteOne({ "_id": present._id });
    }
    return res.status(400).json({ ok: false, message: 'No file uploaded.' })
  }
  try {
    if (present) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: 'technocracy-97aab.appspot.com',
      })

      const bucket = admin.storage().bucket()
      const folderPath = `${process.env.DB}/Vigyaan/Teams/${data.Team_name}/`
      const fileName = `${file.originalname}`
      const fileUpload = bucket.file(`${folderPath}${fileName}`)

      await fileUpload.save(file.buffer, {
        contentType: file.mimetype,
      })

      const [url] = await fileUpload.getSignedUrl({
        action: 'read',
        expires: '03-09-2099',
      })

      const update = {
        $set: {
          'Abstract': url
        }
      }

      const updateResult = await collection.updateOne({ "Team_name": data.Team_name }, update)
      if (updateResult.modifiedCount === 1) {
        res.status(200).json({ ok: true, message: "Abstract submitted" })
      }
      else {
        if (present) {
          await collection.deleteOne({ "_id": present._id });
        }
        res.status(400).json({ ok: true, message: "Couldn't submit the abstract" })
      }
    }
    else {
      res.status(403).json({ ok: false, message: "No such team present" })
    }
  }
  catch (err) {
    if (present) {
      await collection.deleteOne({ "_id": present._id });
    }
    res.status(500).json({ ok: false, message: "Internal Server Error", error: err })
  }
}

const vigyaanReg = async (req, res) => {
  const data = req.body
  const db = req.db
  delete data.file

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
        res.status(400).json({ ok: false, message: "Couldn't register" })
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

module.exports = { vigyaanReg, vigyaanAbstract }
const { Router } = require("express");
const { vigyaanReg, getFileURL, changeVigyaanFile } = require("../controllers/VigyaanControllers")
const multer = require('multer')

const storage = multer.memoryStorage()
const upload = multer({ storage })
const router = Router()

router.post('/server/vigyaanReg', upload.single('file'), vigyaanReg)
// router.post('/server/vigyaanAbstract', upload.single('file'), vigyaanAbstract)
router.get('/server/getFileURL', getFileURL)
router.post('/server/changeVigyaanFile', upload.single('file'), changeVigyaanFile)
module.exports = router
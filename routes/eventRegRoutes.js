const { Router } = require("express");
const { vigyaanReg, vigyaanAbstract, getFileURL, changeFile } = require("../controllers/VigyaanControllers")
const multer = require('multer')

const storage = multer.memoryStorage()
const upload = multer({ storage })
const router = Router()

router.post('/server/vigyaanReg', vigyaanReg)
router.post('/server/vigyaanAbstract', upload.single('file'), vigyaanAbstract)
router.get('/server/getFileURL', getFileURL)
router.post('/server/changeFile', upload.single('file'), changeFile)
module.exports = router
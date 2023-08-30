const { Router } = require("express");
const { vigyaanReg, vigyaanAbstract } = require("../controllers/eventRegControllers")
const multer = require('multer')

const storage = multer.memoryStorage()
const upload = multer({ storage })
const router = Router()

router.post('/server/vigyaanReg', vigyaanReg)
router.post('/server/vigyaanAbstract', upload.single('file'), vigyaanAbstract)

module.exports = router
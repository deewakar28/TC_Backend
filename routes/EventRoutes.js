const { Router } = require("express");
const { Register, register_bgmi } = require("../controllers/EventController")
const multer = require('multer')

const storage = multer.memoryStorage()
const upload = multer({ storage })
const router = Router()

router.post('/server/register', upload.single('file'), Register);
router.post('/server/register/bgmi', upload.single('file'), register_bgmi);
module.exports = router
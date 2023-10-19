const { Router } = require("express");
const { fetchAll } = require("../controllers/AdminControllers")
const multer = require('multer')

const storage = multer.memoryStorage()
const upload = multer({ storage })
const router = Router()

router.get('/server/fetchAll', fetchAll);
module.exports = router
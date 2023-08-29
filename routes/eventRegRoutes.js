const { Router } = require("express");
const {vigyanReg} = require("../controllers/eventRegControllers")

const router = Router()

router.post('/server/vigyanReg', vigyanReg)

module.exports = router
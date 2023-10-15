const { Router } = require("express");
const { Register } = require("../controllers/EventRegister")

const router = Router()

router.post('/server/register', Register);
module.exports = router
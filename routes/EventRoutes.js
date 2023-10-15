const { Router } = require("express");
const { Register } = require("../controllers/EventController")

const router = Router()

router.post('/server/register', Register);
module.exports = router
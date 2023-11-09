import { Router } from "express";
import { Register, register_bgmi } from "../controllers/EventController";
import multer from "multer";
import { checkDBConnection } from "../middleware/check";

const storage = multer.memoryStorage()
const upload = multer({ storage })
const router = Router()

router.use(checkDBConnection);
router.post('/server/register', upload.single('file'), Register);
router.post('/server/register/bgmi', upload.single('file'), register_bgmi);

export default router;
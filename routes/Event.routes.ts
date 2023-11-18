import { Router } from "express";
import { Register, register_bgmi } from "../controllers/Event.controller";
import multer from "multer";
import { checkDBConnection } from "../middleware/check";

const storage = multer.memoryStorage();
const upload = multer({ storage });
const router = Router();

router.use(checkDBConnection);
router.post("/register", upload.single("file"), Register);
router.post("/register/bgmi", upload.single("file"), register_bgmi);

export default router;
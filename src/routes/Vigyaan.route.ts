import { Router } from "express";
import multer from "multer";
import { checkDBConnection } from "../middleware/check";
import { changeVigyaanFile, getFileURL, vigyaanReg } from "../controllers/Vigyaan.controllers";

const storage = multer.memoryStorage();
const upload = multer({ storage });
const router = Router();

router.use(checkDBConnection);
router.post("/vigyaanReg", upload.single("file"), vigyaanReg);
router.get("/getFileURL", getFileURL);
router.post("/changeVigyaanFile", upload.single("file"), changeVigyaanFile);

export default router;
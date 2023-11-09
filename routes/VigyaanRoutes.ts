import { Router } from "express";
import multer from 'multer';
import { checkDBConnection } from "../middleware/check";
import { changeVigyaanFile, getFileURL, vigyaanReg } from "../controllers/VigyaanControllers";

const storage = multer.memoryStorage();
const upload = multer({ storage })
const router = Router()

router.use(checkDBConnection);
router.post('/server/vigyaanReg', upload.single('file'), vigyaanReg)
router.get('/server/getFileURL', getFileURL)
router.post('/server/changeVigyaanFile', upload.single('file'), changeVigyaanFile)

export default router;
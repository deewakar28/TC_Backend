import { Router } from "express";
import { fetchAll } from "../controllers/AdminControllers";

const router = Router()

router.get('/server/fetchAll', fetchAll);

export default router;
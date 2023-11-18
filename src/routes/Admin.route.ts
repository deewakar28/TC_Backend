import { Router } from "express";
import { fetchAll } from "../controllers/Admin.controllers";

const router = Router();

router.get("/fetchAll", fetchAll);

export default router;
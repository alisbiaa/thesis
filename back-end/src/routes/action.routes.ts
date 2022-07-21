import {Router} from "express";
import {ban} from "../controllers/action.controller";

const router = Router();

// Ban student
router.post("/ban",ban)

export default router;

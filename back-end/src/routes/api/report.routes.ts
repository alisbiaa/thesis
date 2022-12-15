import {Router} from "express";
import {create, get_all, remove} from "../../controllers/report.controller";

const router = Router();

// Get All
router.get("/", get_all);

// Create
router.post("/", create);

// Delete
router.delete("/:id", remove)

export default router;
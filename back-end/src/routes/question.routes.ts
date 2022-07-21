import {Router} from "express";
import {create, get_all, get_all_by_subject, get_one, remove} from "../controllers/question.controller";

const router = Router();

// Get All
router.get("/", get_all);

// Get all by subject_id
router.get("/subject/:id", get_all_by_subject);

// Get one
router.get("/:id", get_one);

// Create
router.post("/", create);

// Delete
router.delete("/:id", remove)

// Hide

// Solve



export default router;

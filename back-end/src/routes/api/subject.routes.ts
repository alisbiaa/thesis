import {Router} from "express";
import {create, create_many, get_all_by_department, get_one, remove, get_all} from "../../controllers/subject.controller";

const router = Router();

// Create subject
router.post("/", create);

// create many
router.post("/many", create_many);

// Get one
router.get("/get_one/:id", get_one);

// Get all by department
router.get("/get_all/:id", get_all_by_department);

// Get all
router.get("/", get_all);

// Delete one
router.delete("/:id", remove);


export default router;

import {Router} from "express";
import {create, create_many, get_all, get_one, remove} from "../../controllers/subject.controller";

const router = Router();

// Create subject
router.post("/", create);

// create many
router.post("/many", create_many);

// Get one
router.get("/get_one/:id", get_one);

// Get all
router.get("/get_all/:id", get_all);

// Delete one
router.delete("/:id", remove);


export default router;

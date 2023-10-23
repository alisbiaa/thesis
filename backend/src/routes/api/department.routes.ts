import {Router} from "express";
import {create, get_one, get_all, remove, update, create_many} from "../../controllers/department.controller";

const router = Router();

// Create new department
router.post("/", create);

// Create many departments
router.post("/many", create_many);

// search one
router.get("/:id", get_one);

// search all
router.get("/", get_all);

// Delete department
router.delete("/:id", remove);

// Set head department
router.put("/:id", update);

export default router;

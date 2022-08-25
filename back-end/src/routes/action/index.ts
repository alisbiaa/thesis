import {Router} from "express";
import {ban_user, set_user_role, unban_user} from "../../controllers/actions.controller";
import {adminAuth} from "../../middlewares/adminAuth";

const router = Router();

router.put("/set_role", adminAuth, set_user_role);
router.put("/ban", adminAuth, ban_user);
router.put("/unban", adminAuth, unban_user);
// router.post()

export default router;


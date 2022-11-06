import {Router} from "express";
import {
    ban_user,
    set_user_role,
    unban_user,
    update_question_approve,
    update_question_hidden,
    update_question_important,
} from "../../controllers/actions.controller";
import {adminAuth} from "../../middlewares/adminAuth";
import {teacherAuth} from "../../middlewares/teacherAuth";

const router = Router();

// users
router.put("/set_role", adminAuth, set_user_role);
router.put("/ban", adminAuth, ban_user);
router.put("/unban", adminAuth, unban_user);

// question
router.put("/question/important", teacherAuth, update_question_important);
router.put("/question/hidden", teacherAuth, update_question_hidden);

// answer
router.put("/answer/approve", teacherAuth, update_question_approve);



// router.post()

export default router;


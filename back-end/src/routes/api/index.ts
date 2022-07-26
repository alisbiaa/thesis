import {Router} from "express";
import departmentRoutes from "./department.routes";
import subjectRoutes from "./subject.routes";
import questionRoutes from "./question.routes";
import answerRoutes from "./answer.routes";
import reportRoutes from "./report.routes";

const router = Router();

router.use("/department", departmentRoutes);
router.use("/subject", subjectRoutes);
router.use("/question", questionRoutes);
router.use("/answer", answerRoutes);
router.use("/report", reportRoutes);

export default router;


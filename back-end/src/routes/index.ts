import {Router} from "express";
import userRoutes from "./user.routes";
import departmentRoutes from "./department.routes";
import subjectRoutes from "./subject.routes";
import questionRoutes from "./question.routes";
import answerRoutes from "./answer.routes";
import actionRoutes from "./action.routes";

const BaseRouter = Router();

BaseRouter.use("/api/user/teacher", userRoutes);
BaseRouter.use("/api/department", departmentRoutes);
BaseRouter.use("/api/subject", subjectRoutes);
BaseRouter.use("/api/question", questionRoutes);
BaseRouter.use("/api/answer", answerRoutes);
BaseRouter.use("/api/action", actionRoutes);

export default BaseRouter;

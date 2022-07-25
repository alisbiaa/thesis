import {Router} from "express";
import apiRouter from "./api";
import userRouter from "./user";
import workflowRouter from "./workflow";

const BaseRouter = Router();

BaseRouter.use("/api", apiRouter);
BaseRouter.use("/user", userRouter);
BaseRouter.use("/workflow", workflowRouter);

export default BaseRouter;

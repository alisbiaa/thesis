import {Router} from "express";
import apiRouter from "./api";
import workflowRouter from "./workflow";
import userRoutes from "./user.routes";

const BaseRouter = Router();

BaseRouter.use("/api", apiRouter);
BaseRouter.use("/user", userRoutes);
BaseRouter.use("/workflow", workflowRouter);


export default BaseRouter;

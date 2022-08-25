import {Router} from "express";
import apiRouter from "./api";
import actionRouter from "./action";
import userRoutes from "./user.routes";

const BaseRouter = Router();

BaseRouter.use("/api", apiRouter);
BaseRouter.use("/user", userRoutes);
BaseRouter.use("/action", actionRouter);


export default BaseRouter;

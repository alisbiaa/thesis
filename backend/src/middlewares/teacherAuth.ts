import {RequestHandler} from "express";
import {user_model} from "../models/user.model";

export const teacherAuth : RequestHandler = async (req, res, next) => {
    const {requester} = req.body;
    const user = await user_model.findOne({email: requester});
    if(!(user?.role == "teacher") && !(user?.role == "admin") )
        return res.status(401).json({
            status: 401, success: false, message: "Unauthorized - you are not teacher",
        })
    else
        next();
}
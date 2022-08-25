import {RequestHandler} from "express";
import {IUser, user_model} from "../models/user.model";

export const set_user_role : RequestHandler = (req, res) => {
    const {email, role}: IUser = req.body;
    user_model.findOneAndUpdate({email}, {role})
        .then(data => {
            const status = data ? 200 : 404;
            res.status(status).send({
                data,
                status,
                success: !!data,
                message: data ? "User role updated!" : "User doesn't exist."
            })
        })
        .catch(error =>
            res.status(500).send({
                error, status: 500, success: false, message: "Server side error!",
            })
        );
}

export const ban_user : RequestHandler = (req, res) => {
    const {email}: IUser = req.body;
    user_model.findOneAndUpdate({email}, {banned : true})
        .then(data => {
            const status = data ? 200 : 404;
            res.status(status).send({
                data,
                status,
                success: !!data,
                message: data ? "User banned!" : "User doesn't exist."
            })
        })
        .catch(error =>
            res.status(500).send({
                error, status: 500, success: false, message: "Server side error!",
            })
        );
}

export const unban_user : RequestHandler = (req, res) => {
    const {email}: IUser = req.body;
    user_model.findOneAndUpdate({email}, {banned : false})
        .then(data => {
            const status = data ? 200 : 404;
            res.status(status).send({
                data,
                status,
                success: !!data,
                message: data ? "User unbanned!" : "User doesn't exist."
            })
        })
        .catch(error =>
            res.status(500).send({
                error, status: 500, success: false, message: "Server side error!",
            })
        );
}
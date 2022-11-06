import {RequestHandler} from "express";
import {IUser, user_model} from "../models/user.model";
import {question_model} from "../models/question.model";
import _ from "lodash";

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

export const unban_user: RequestHandler = (req, res) => {
    const {email}: IUser = req.body;
    user_model.findOneAndUpdate({email}, {banned: false})
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
};

export const update_question_important: RequestHandler = (req, res) => {
    const {id,important} = req.body;
    question_model.findByIdAndUpdate(id, {important})
        .then(data => {
            const status = data ? 200 : 404;
            res.status(status).send({
                status,
                success: !!data,
                message: data ? "Question updated!" : "Question doesn't exist."
            })
        })
        .catch(error =>
            res.status(500).send({
                error, status: 500, success: false, message: "Server side error!",
            })
        );
}

export const update_question_hidden: RequestHandler = (req, res) => {
    const {id,hidden} = req.body;
    question_model.findByIdAndUpdate(id, {hidden})
        .then(data => {
            const status = data ? 200 : 404;
            res.status(status).send({
                status,
                success: !!data,
                message: data ? "Question updated!" : "Question doesn't exist."
            })
        })
        .catch(error =>
            res.status(500).send({
                error, status: 500, success: false, message: "Server side error!",
            })
        );
}

export const update_question_approve : RequestHandler = async (req, res) => {
    const {id,approve} = req.body;
    try {
        const question = await question_model.findOne({'answers._id': id});
        if(question) {
            question.answers = question.answers.map(el => {
                if (el._id == id)
                    return _.update(el, 'approved', () => approve);
                return el
            });
            question.solved = question.answers.some(el => el.approved);
            question.save()
                .then(data => {
                    res.status(200).send({
                        status: 200,
                        success: true,
                        message: "Question updated!",
                        data
                    });
                })
        }
        else
            res.status(404).send({
                status: 404, success: false, message: "Question doesn't exist.",
            })
    } catch (error) {
        res.status(500).send({
            error, status: 500, success: false, message: "Server side error!",
        })
    }


}
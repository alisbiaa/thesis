import {RequestHandler} from "express";
import {question_model} from "../models/question.model";

export const create: RequestHandler = (req, res) => {
    const {content,user,question_id}  = req.body;
    question_model.findById(question_id)
        .then(question => {
            if (question) {
                const q = new question_model(question);
                // @ts-ignore
                q.answers = [...question.answers, {content, user}];
                q.save((error, result) => {
                    if (error) {
                        res.status(400).send({
                            error, status: 400, success: false, message: "Response could not be added !"
                        });
                    }
                    else
                        res.status(200).send({
                            data : result, status: 200, success: true, message: "Response added !"
                        });
                })

            } else {
                res.status(404).send({
                    status: 404, success: false, message: "Question not found!"
                });
            }

        })
        .catch(error =>
            res.status(500).send({
                error, status: 500, success: false, message: "Internal Server Error!"
            }));
};

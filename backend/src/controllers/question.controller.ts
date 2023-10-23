import {RequestHandler} from "express";
import {IQuestion, question_model} from "../models/question.model";
import {subject_model} from "../models/subject.model";

export const create: RequestHandler = (req, res) => {
    const {
        content,
        user,
        department_id,
        subject_id,
        attachment,
    } : IQuestion = req.body;

    subject_model.findById(subject_id)
        .then(subject => {
            if (subject) { // subject exist
                question_model.create({content, user, department_id, subject_id, attachment})
                    .then(data =>
                        res.status(200).send({
                            data, status: 200, success: true, message: "Question submitted successfully!",
                        })
                    )
                    .catch(error => // Wrong input
                    {
                        res.status(400).send({
                            error, status: 400, success: false, message: "Could not submit question!",
                        })
                        console.log(error);
                    }

                    );
            }else { // Subject doesn't exist
                res.status(404).send({
                    status: 404, success: false, message: "Subject doesn't exist!",
                });
            }
        })
        .catch(error =>
            res.status(500).send({
                error, status: 500, success: false, message: "Internal Server Error!"
            }));
}

export const get_all : RequestHandler = (req, res) => {
    const query = req.query;
    const conditions = Object.keys(query)
        .reduce((result: any, key) => {
            if (query[key] ) {
                result[key] = query[key];
            }
            return result;
        }, {});

    question_model.find(conditions)
        .select(['-answers','-updatedAt', '-__v'])
        .then(data => {
            const status = data.length ? 200 : 404;
            res.status(status).send({
                totalCount : data.length,
                data,
                status,
                success: !!data.length,
                message: data.length ? "All questions!" : "Database empty",
            })
        })
        .catch(error =>
            res.status(500).send({
                error, status: 500, success: false, message: "Server side error!",
            })
        );
}

export const get_one : RequestHandler = (req, res) => {
    const {id} = req.params;
    question_model.findById(id)
        .then(data => {
            const status = data ? 200 : 404;
            res.status(status).send({
                data,
                status,
                success: !!data,
                message: data ? "Question found!" : "Question doesn't exist."
            })
        })
        .catch(error => {
                console.log(error);
                res.status(500).send({
                    error, status: 500, success: false, message: "Server side error!",
                })
            }
        );

}

export const remove : RequestHandler = (req, res) => {
    const {id} = req.params;
    question_model.findByIdAndRemove(id)
        .then(data => {
            const status = data ? 200 : 404;
            res.status(status).send({
                data, status, success: !!data, message: data ? "Question deleted" : "Question doesn't exist."
            });
        })
        .catch(error =>
            res.status(500).send({
                error, status: 500, success: false, message: "Server side error!",
            })
        );
}

export const get_all_by_subject : RequestHandler = (req, res) => {
    const subject_id = req.params.id;
    question_model.find({subject_id})
        .then(data => {
            const status = data.length ? 200 : 404;
            res.status(status).send({
                data,
                status,
                success: !!data.length,
                message: data.length ? "All questions!" : "Database empty...",
            })
        })
        .catch(error =>
            res.status(500).send({
                error, status: 500, success: false, message: "Server side error!",
            })
        );
}

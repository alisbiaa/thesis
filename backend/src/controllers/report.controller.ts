import {RequestHandler} from "express";
import {report_model} from "../models/report.model";


export const create: RequestHandler = (req, res) => {
    const {reporter,reported,content,link} = req.body;
    report_model
        .create({reported, reporter, link, content})
        .then(data =>
            res.status(200).send({
                data, status: 200, success: true, message: "Report created successfully!",
            })
        )
        .catch(error => // Wrong input
            res.status(400).send({
                error, status: 400, success: false, message: "Could not create report!",
            })
        );
};

export const get_all : RequestHandler = (req, res) => {
    report_model.find()
        .then(data => {
            const status = data.length ? 200 : 404;
            res.status(status).send({
                data,
                status,
                success: !!data.length,
                message: data.length ? "All reports!" : "Database empty",
            })
        })
        .catch(error =>
            res.status(500).send({
                error, status: 500, success: false, message: "Server side error!",
            })
        );
}

export const remove: RequestHandler = (req, res) => {
    const {id} = req.params;
    report_model.findByIdAndRemove(id)
        .then(data => {
            const status = data ? 200 : 404;
            res.status(status).send({
                data, status, success: !!data, message: data ? "Report deleted" : "Report doesn't exist."
            });
        })
        .catch(error =>
            res.status(500).send({
                error, status: 500, success: false, message: "Server side error!",
            })
        );
};
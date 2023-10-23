import {RequestHandler} from "express";
import {department_model} from "../models/department.model";
import {ISubject, subject_model} from "../models/subject.model";


export const create: RequestHandler = (req, res) => {
    const {department_id, name,description,semester,link,credits} : ISubject = req.body;
    // search department first
    department_model.findById(department_id)
        .then(department => {
            if (department) {
                subject_model.create({name, department_id,description,semester,link,credits})
                    .then(data =>
                        res.status(200).send({
                            data, status: 200, success: true, message: "Subject created successfully!",
                        })
                    )
                    .catch(error => // Wrong input
                        res.status(400).send({
                            error, status: 400, success: false, message: "Could not create subject!",
                        })
                    );
            } else { // Subject doesn't exist
                res.status(404).send({
                    status: 404, success: false, message: "Subject doesn't exist!",
                });
            }
        })
        .catch(error =>
            res.status(500).send({
                error, status: 500, success: false, message: "Internal Server Error!"
            }));
};

export const create_many: RequestHandler = (req, res) => {
    const subjects : ISubject[] = req.body.data;
    try {
        subject_model.create(subjects)
            .then(data =>
                res.status(200).send({
                    data, status: 200, success: true, message: "Subject created successfully!",
                })
            )
            .catch(error => // Wrong input
                res.status(400).send({
                    error, status: 400, success: false, message: "Could not create subject!",
                })
            );
    }
    catch (error) {
        res.status(500).json({
            error, status: 500, success: false, message: "Internal Server Error!"
        });}

};

export const get_one: RequestHandler = (req, res) => {
    const {id} = req.params;
    subject_model.findById(id)
        .then(data => {
            const status = data ? 200 : 404;
            res.status(status).send({
                data,
                status,
                success: !!data,
                message: data ? "Subject found!" : "Subject doesn't exist."
            })
        })
        .catch(error =>
            res.status(500).send({
                error, status: 500, success: false, message: "Server side error!",
            })
        );
};

export const get_all_by_department: RequestHandler = (req, res) => {
    const {id} = req.params; // id of the department
    // search department
    department_model.findById(id)
        .then(data => {
            if (data) { // Subject exist
                subject_model.find({department_id: id})
                    .then(data => {
                        const status = data.length ? 200 : 404;
                        res.status(status).send({
                            data,
                            status,
                            success: !!data.length,
                            message: data.length ? `All subjects for ${id}!` : "Database empty",
                        })
                    })
            } else { // Subject doesn't exist
                res.status(404).send({
                    status: 404, success: false, message: "Subject doesn't exist!",
                });
            }
        })
        .catch(error => {
            res.status(500).send({
                error, status: 500, success: false, message: "Server side error!",
            })
        });
};

export const get_all : RequestHandler = (req, res) => {
    subject_model.find()
        .then(data => {
            const status = data.length ? 200 : 404;
            res.status(status).send({
                data,
                status,
                success: !!data.length,
                message: data.length ? "All subjects!" : "Database empty",
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
    subject_model.findByIdAndRemove(id)
        .then(data => {
            const status = data ? 200 : 404;
            res.status(status).send({
                data, status, success: !!data, message: data ? "Subject deleted" : "Subject doesn't exist."
            });
        })
        .catch(error =>
            res.status(500).send({
                error, status: 500, success: false, message: "Server side error!",
            })
        );
};

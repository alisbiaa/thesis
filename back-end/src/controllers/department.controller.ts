import {RequestHandler} from "express";
import {department_model, IDepartment} from "../models/department.model";

// Create department
export const create: RequestHandler = (req, res) => {
    const {name,description}: IDepartment = req.body;
    try {
        department_model.create({name,description})
                        .then(data =>
                            res.status(200).json({
                                data, status: 200, success: true, message: "Subject created successfully!",
                            })
                        )
                        .catch(error => // Wrong input
                            res.status(400).json({
                                error : error?.message, status: 400, success: false, message: "Could not create department!",
                            })
                        );
    } catch (error) {
        res.status(500).json({
            error, status: 500, success: false, message: "Internal Server Error!"
        });
    }
};

// Create department
export const create_many: RequestHandler = (req, res) => {
    const departments: IDepartment[] = req.body.data;
    try {
        department_model.create(departments)
            .then(data =>
                res.status(200).json({
                    data, status: 200, success: true, message: "Subject created successfully!",
                })
            )
            .catch(error => // Wrong input
                res.status(400).json({
                    error : error?.message, status: 400, success: false, message: "Could not create department!",
                })
            );
    } catch (error) {
        res.status(500).json({
            error, status: 500, success: false, message: "Internal Server Error!"
        });
    }
};


// Remove department
export const remove: RequestHandler = (req, res) => {
    const {id} = req.params;
    department_model.findByIdAndRemove(id)
        .then(data => {
            const status = data ? 200 : 404;
            res.status(status).json({
                data, status, success: !!data, message: data ? "Subject deleted" : "Subject doesn't exist."
            });
        })
        .catch(error =>
            res.status(500).json({
                error, status: 500, success: false, message: "Server side error!",
            })
        );
};

// Get all
export const get_all: RequestHandler = (req, res) => {
    department_model.find({})
        .then(data => {
            const status = data.length ? 200 : 404;
            res.status(status).json({
                data,
                status,
                success: !!data.length,
                message: data.length ? "All Departments!" : "Database empty",
            })
        })
        .catch(error =>
            res.status(500).json({
                error, status: 500, success: false, message: "Server side error!",
            })
        );

};

// search one
export const get_one: RequestHandler = (req, res) => {
    const {id} = req.params;
    department_model.findById(id)
        .then(data => {
            const status = data ? 200 : 404;
            res.status(status).json({
                data,
                status,
                success: !!data,
                message: data ? "Subject found!" : "Subject doesn't exist."
            })
        })
        .catch(error =>
            res.status(500).json({
                error, status: 500, success: false, message: "Server side error!",
            })
        );
};

// Update head department or description
export const update: RequestHandler = async (req, res) => {
    const {id} = req.params;
    const {description} = req.body;

    department_model.findByIdAndUpdate(id, {description}, {useFindAndModify: false})
        .then(data => {
            const status = data ? 200 : 404;
            res.status(status).json({
                data,
                status,
                success: !!data,
                message: data ? "Head department updated!" : "Subject doesn't exist.",
            })
        })
        .catch(error => // Wrong input
            res.status(400).json({
                error, status: 400, success: false, message: "Could not update department!",
            })
        );
};

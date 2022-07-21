import {RequestHandler} from "express";
import {Ban} from "../entities/Action";
import {User} from "../entities/User";

export const ban : RequestHandler = async (req, res) => {
    const {user_email, student_email} = req.body;
    try{
        try {
            const user = new User(user_email);
            await user.init();
            const action = new Ban(user.role);
            const response = await action.execute(student_email);
            res.status(response.status).send(response);
        } catch (e : any) {
            res.status(500).send({
                message: "Server side error",
                success: false,
                error : e.message,
                status: 500
            });
        }

    }catch (e) {
        console.error(e);
    }


}

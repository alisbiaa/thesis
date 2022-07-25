import {model, Schema} from "mongoose";
import {IAnswer,answer_schema} from "./answer.model";

export interface IQuestion {
    content: string;

    solved: boolean;
    hidden: boolean;
    important: boolean;

    user: string; // email of the user
    department_id: string;
    subject_id: string;

    answers: IAnswer[];
}

const schema = new Schema<IQuestion>({
    content: {type: String, required: true, unique : true},

    solved: {type: Boolean, default: false},
    hidden: {type: Boolean, default: false},
    important: {type: Boolean, default: false},

    user: {type: String, required: true},
    department_id: {type: String, required: true},
    subject_id: {type: String, required: true},

    answers : {
        type : [answer_schema],
        default: []
    }

}, {timestamps: true, autoIndex: true});

export const question_model = model<IQuestion>("question", schema);


import {model, Schema} from "mongoose";

export interface ISubject {
    name: string;
    department_id: string;
    description: string;
    credits: number;
    semester: number;
    link: string | null;
}

const schema = new Schema<ISubject>({
    name: {type: String, required: true, unique: true},
    department_id: {type: String, required: true},
    description: {type: String, required: true},
    credits : {type : Number, required : true},
    semester : {type : Number, required : true},
    link : {type : String , required : true},
}, {timestamps: true, autoIndex: true});

export const subject_model = model<ISubject>("subject", schema);


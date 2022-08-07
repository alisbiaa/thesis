import {Schema} from "mongoose";

export interface IAnswer {
    content: string;
    user: string; // email of the user
    approved: boolean; // only teacher can approve
    credibility: number;
}

export const answer_schema = new Schema<IAnswer>({
    content: {type: String, required: true},
    user: {type: String, required: true, unique : true},
    approved: {type: Boolean, default: false},
    credibility: {type: Number, default: 0},
}, {timestamps: true, autoIndex: true});




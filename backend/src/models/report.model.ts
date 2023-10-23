import {model, Schema} from "mongoose";

export interface IReport {
    reporter : string; // email
    reported : string; // email
    content: string;
    link: string;
}

const schema = new Schema<IReport>({
    reporter : {type : String, required : true}, // email
    reported : {type : String, required : true}, // email
    content: {type : String, required : true},
    link: {type : String, required : true},
}, {
    timestamps : true
});

export const report_model = model<IReport>("report", schema);

import {model, Schema, Document} from "mongoose";

export interface IDepartment extends Document{
    name: string;
    description: string;
}

const schema = new Schema<IDepartment>({
    name : {type : String, required : true, unique: true},
    description : {type : String, required : true},
});

export const department_model = model<IDepartment>("department", schema);

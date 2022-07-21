import {model, Schema, Types} from "mongoose";

export interface IDepartment {
    name: string;
    description: string;
}

// interface IStructre {
//     mission: string;
//     description: string;
//
// }
//
// const structure = new Schema<IStructre>({
//
// });

const schema = new Schema<IDepartment>({
    name : {type : String, required : true, unique: true},
    description : {type : String, required : true},
});

export const department_model = model<IDepartment>("department", schema);

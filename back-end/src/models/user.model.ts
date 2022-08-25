import {model, Schema} from "mongoose";

export interface IUser {
    email: string;
    name: string;
    bio: string | null;
    department_id: string | null;
    role: "student" | "teacher" | "admin" | "RO";
    banned : boolean
}

const schema = new Schema<IUser>({
    email: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    bio: {type: String, default:null},
    department_id: {
        type: String,
        default: null
    }, // TODO : make the required conditional to role
    role: {
        type: String,
        default: 'RO',
        enum: ['student', 'teacher', 'admin', 'RO'],
    },
    banned : {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true,
    autoIndex: true,
    collation : {
        strength: 2,
        locale: "en",
    }
});

export const user_model = model<IUser>("user", schema);

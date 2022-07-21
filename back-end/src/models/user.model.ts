import {model, Schema} from "mongoose";

export interface IUser {
    email: string;
    name: string;
    last_name: string;
    bio?: string;
    department_id: string | null;
    role: "student" | "teacher" | "admin";
    banned? : boolean
}

const schema = new Schema<IUser>({
    email: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    last_name: {type: String, required: true},
    bio: {type: String},
    department_id: {type: String, default: null}, // TODO : make the required conditional to role
    role: {
        type: String,
        required: true,
        enum: ['student', 'teacher', 'admin'],
    },
    banned : {
        type: Boolean,
        required: function (this : IUser) {
            return this.role === 'student';
        },
        validate: {
            validator : function (this: IUser) {
                return this.role === 'student';
            },
            message : "Banned is only associated to students!"
        },
        default: false,
    }
}, {timestamps: true, autoIndex: true});

export const user_model = model<IUser>("user", schema);

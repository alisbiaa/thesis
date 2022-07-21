import {Role} from "./Role";
import {user_model} from "../models/user.model";
import {IQuestion, question_model} from "../models/question.model";
interface IResponse {
    status: number;
    data?: any;
    error?: any;
    message: string;
    success: boolean;
}

class Action {
    // TODO : action should have User as a parameter
    protected user_role: Role ;

    constructor(user_role: Role) {
        this.user_role = user_role;
    }

    async execute(data : any) : Promise<IResponse> {
        throw new Error("Method 'execute()' must be implemented.");
    }

    protected allowed(): boolean {
        throw new Error("Method 'allowed()' must be implemented.");
    }
}

export class Ban extends Action {
    constructor(user_role: Role) {
        super(user_role);
    }

    async execute(student_email: string): Promise<IResponse>  {
        // check authorization
        const authorization = this.allowed();
        if (authorization) {
            // attempt to find and update user
            const updated = await user_model.findOneAndUpdate({email: student_email}, {banned: true}).exec();
            // student does not exist
            return {
                status : !!updated ? 200 : 400,
                success : !!updated,
                message : !!updated ? `${student_email} is banned` : "Student does not exist in the database!",
            }
        }
        // user unauthorized
        return {
            status : 401,
            success : false,
            message : "User unauthorized for this action!"
        };
    }

    protected allowed(): boolean {
        return this.user_role.isAdmin() || this.user_role.isTeacher();
    }
}

export class AskQuestion extends Action {
    constructor(user_role: Role) {
        super(user_role);
    }
    async execute(question: IQuestion): Promise<IResponse>  {
        // check authorization
        const authorization = this.allowed();
        if (authorization) {
            // validate question
            const validation = new question_model(question).validateSync();
            if (validation) {
                // TODO: finish
            }
            // attempt to create model
            const q = await question_model.create(question);
        }
        // user unauthorized
        return {
            status : 401,
            success : false,
            message : "User unauthorized for this action!"
        };
    }

    protected allowed(): boolean {
        return this.user_role.isTeacher() || this.user_role.isStudent();
    }
}


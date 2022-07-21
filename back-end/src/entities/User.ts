import {IUser, user_model} from "../models/user.model";
import {Admin, Role, Student, Teacher} from "./Role";


export class User {
    private _user: IUser | null = null;
    private _role: Role | null = null;

    constructor(protected email: string) {
        // this.initiate_user().catch(e => console.error(e));
    }

    // GETTER
    get user () : IUser  {
        if(!this._user)
            throw Error("User doesn't exist");
        return this._user;
    }

    get role(): Role {
        if(!this._role)
            throw Error("Role is null");
        return this._role;
    }

// SETTER
    public async init()  {
        this._user = await user_model.findOne({email: this.email});
        if(this._user)
            switch (this._user.role){
                case "admin":
                    this._role = new Admin();
                    break;
                case "student":
                    this._role = new Student();
                    break;
                case "teacher":
                    this._role = new Teacher();
                    break;
                default:
                    throw Error("User doesn't have a role");
            }
        else
            throw Error("User doesn't exist");
    }


}







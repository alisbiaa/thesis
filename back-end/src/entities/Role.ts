
export abstract class Role {
    isAdmin(): boolean {
        return false;
    }
    isTeacher() : boolean {
        return false;
    }
    isStudent(): boolean {
        return false;
    }
}

export class Student extends Role {

    override isStudent(): boolean {
        return true;
    }
}

export class Teacher extends Role {

    override isTeacher(): boolean {
        return true;
    }
}

export class Admin extends Role {

    override isAdmin(): boolean {
        return true;
    }
}

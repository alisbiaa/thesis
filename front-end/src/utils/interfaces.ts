export interface IResponse {
    data: any;
    error: any;
    message: string;
    status: number;
    success: boolean;
}

export interface IDepartment {
    "_id": string,
    "name": string,
    "description" : string
}

export interface ITeacher {
    "department_id": string | null,
    "_id": string,
    "bio": string,
    "email": string,
    "last_name": string,
    "name": string,
}

export interface ISubject {
    "_id": string,
    "name": string,
    "department_id": string,
    "description": string,
}

export interface IQuestion {
    _id?: string,
    content: string;
    user: string; // email of the user

    solved: boolean;
    hidden: boolean;
    important: boolean;

    department_id: string;
    subject_id: string;
}

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



export interface ISubject {
    "_id": string,
    "name": string,
    "department_id": string,
    "description": string,
    credits: number;
    semester: number;
    link: string | null;
}


export interface IAnswer {
    _id: string,
    content: string;
    user: string; // email of the user
    approved: boolean; // only teacher can approve
    credibility: number;
    createdAt: string;
}

export interface IQuestion {
    _id: string,
    content: string;

    solved: boolean;
    hidden: boolean;
    important: boolean;

    user: string; // email of the user
    department_id: string;
    subject_id: string;

    answers: IAnswer[];

    attachment?: string;

    createdAt: string;
}


export interface IUser {
    email: string;
    name: string;
    bio: string | null;
    department_id: string | null;
    role: "student" | "teacher" | "admin" | "RO";
    banned : boolean
}

export interface IReport {
    reporter : string; // email
    reported : string; // email
    content: string;
    link: string;
}

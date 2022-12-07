import {IUser} from "../../models/user.model";
import {IDepartment} from "../../models/department.model";
import {IQuestion} from "../../models/question.model";
import {ISubject} from "../../models/subject.model";

export const mock_user: IUser = {
    banned: false,
    department_id: null,
    role: "admin",
    name: "Ali",
    bio: "Random Bio",
    email: "alisbiaazayen@gmail.com"
};

// @ts-ignore
export const mock_department: IDepartment = {
    name: "Department 1",
    description: "short description",
    _id: "62e6d8052701ac00e4192be5",
};

export const mock_subject : ISubject = {
    name: "Computer systems",
    description: "A computer system is a set of integrated devices that input, output, process, and store data and information. Computer systems are currently built around at least one digital processing device. There are five main hardware components in a computer system: Input, Processing, Storage, Output and Communication devices.",
    credits : 5,
    semester : 1,
    link : "https://www.inf.elte.hu/dstore/document/1483/Computer%20systems.pdf",
    department_id : "62e6d8052701ac00e4192be5"
}

export const mock_question : IQuestion = {
    answers: [],
    attachment: "",
    content: "This is a fake question",
    department_id: "62e6d8052701ac00e4192be5",
    hidden: false,
    important: false,
    solved: false,
    subject_id: "",
    user: "alisbiaazayen@gmail.com"
}
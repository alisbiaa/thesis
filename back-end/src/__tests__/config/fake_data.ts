import {IUser} from "../../models/user.model";
import {IDepartment} from "../../models/department.model";
import {IQuestion} from "../../models/question.model";
import {ISubject} from "../../models/subject.model";
import {IReport} from "../../models/report.model";

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

// @ts-ignore
export const mock_question: IQuestion = {
    "_id": "6338dd317a21c919b873aa33",
    "solved": false,
    "hidden": false,
    "important": false,
    "content": "File upload",
    "user": "cn4f59@INF.ELTE.HU",
    "department_id": "62e6d8052701ac00e4192be5",
    "subject_id": "62e6dc982f2fb60249a8f936",
    "attachment": "https://firebasestorage.googleapis.com/v0/b/thesis-blob-storage.appspot.com/o/cn4f59%40INF.ELTE.HU%2FScreenshot%202022-10-02%20011348.png?alt=media&token=6da49c04-f00f-495f-8efb-cb6661a7f0ca",
    "answers": [],
};

export const mock_report : IReport = {
    reported: "ali@exm.tn",
    reporter: "mm@test.t",
    link: "fakelink.com",
    content: "This is a report",
}
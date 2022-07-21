import axios from "axios";
import {IDepartment, IQuestion, ITeacher} from "./interfaces";

const end_point: string = "http://localhost:8080/api";

export const department_get_all = async () => {
    try {
        const {data} = await axios.get(`${end_point}/department`);
        return data;
    } catch (e:any) {
        return e?.response?.data;
    }
}

export const department_get_one = async (id:string|undefined) => {
    if(!id) return;
    try {
        const {data} = await axios.get(`${end_point}/department/${id}`);
        return data;
    } catch (e:any) {
        return e?.response?.data;
    }
}

export const department_create = async ({name, description} : IDepartment) => {
    try {
        const {data} = await axios.post(`${end_point}/department/`, {
            name,description
        });
        return data;
    } catch (e: any) {
        return e?.response?.data;
    }
};

export const teacher_get_one = async (email: string | undefined) => {
    if (!email) return;
    try {
        const {data} = await axios.get(`${end_point}/user/teacher/${email}`);
        return data;
    } catch (e: any) {
        return e?.response?.data;
    }
};

export const teacher_create = async ({department_id,name,last_name,email,bio}:ITeacher) => {
    try{
        const {data} = await axios.post(`${end_point}/user/teacher/`,{
            email,
            bio,
            last_name,
            name,
            department_id
        });
        return data;
    } catch (e:any) {
        return e?.response?.data;
    }

}

export const teacher_get_all = async () => {
    try {
        const {data} = await axios.get(`${end_point}/user/teacher`);
        return data;
    } catch (e:any) {
        return e?.response?.data;
    }
}

export const teacher_get_all_by_department = async(id:string|undefined)=> {
    if(!id) return;
    try {
        const {data} = await axios.get(`${end_point}/user/teacher/department/${id}`);
        return data;
    } catch (e:any) {
        return e?.response?.data;
    }
}



export const subject_get_all = async (id:string|undefined) => {
    if(!id) return;
    try {
        const {data} = await axios.get(`${end_point}/subject/get_all/${id}`);
        return data;
    } catch (e:any) {
        return e?.response?.data;
    }
}

export const subject_create = async (name:string,department_id:string,description:string) => {
    try {
        const {data} = await axios.post(`${end_point}/subject/`, {
            name,
            department_id,
            description
        });
        return data;
    } catch (e: any) {
        return e?.response?.data;
    }
}

export const subject_get_one = async (id: string | undefined) => {
    if (!id) return;
    try {
        const {data} = await axios.get(`${end_point}/subject/get_one/${id}`);
        return data;
    } catch (e: any) {
        return e?.response?.data;
    }
};

export const question_create = async ({department_id,subject_id,user,content} : IQuestion) => {
    try {
        const {data} = await axios.post(`${end_point}/question/`, {
            user,
            department_id,
            subject_id,
            content
        });
        return data;
    } catch (e: any) {
        return e?.response?.data;
    }
}

export const question_get_all = async () => {
    try {
        const {data} = await axios.get(`${end_point}/question`);
        return data;
    } catch (e:any) {
        return e?.response?.data;
    }
}

export const question_get_one = async (id: string | undefined) => {
    if (!id) return;
    try {
        const {data} = await axios.get(`${end_point}/question/${id}`);
        return data;
    } catch (e: any) {
        return e?.response?.data;
    }
};

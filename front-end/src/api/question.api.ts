import baseAPI from "../config/baseAPI";
import {IQuestion} from "../static/interfaces";

export const question_create = async ({department_id,subject_id,user,content} : IQuestion) => {
    try {
        const {data} = await baseAPI.post(`/api/question/`, {
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
        const {data} = await baseAPI.get(`/api/question`);
        return data;
    } catch (e:any) {
        return e?.response?.data;
    }
}

export const question_get_one = async (id: string | undefined) => {
    if (!id) return;
    try {
        const {data} = await baseAPI.get(`/api/question/${id}`);
        return data;
    } catch (e: any) {
        return e?.response?.data;
    }
}

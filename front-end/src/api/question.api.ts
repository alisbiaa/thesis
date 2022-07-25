import baseAPI from "../utils/baseAPI";
import {IQuestion} from "../utils/interfaces";

export const question_create = async ({department_id,subject_id,user,content} : IQuestion) => {
    try {
        const {data} = await baseAPI.post(`/question/`, {
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
        const {data} = await baseAPI.get(`/question`);
        return data;
    } catch (e:any) {
        return e?.response?.data;
    }
}

export const question_get_one = async (id: string | undefined) => {
    if (!id) return;
    try {
        const {data} = await baseAPI.get(`/question/${id}`);
        return data;
    } catch (e: any) {
        return e?.response?.data;
    }
}

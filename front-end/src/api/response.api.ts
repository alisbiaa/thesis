import baseAPI from "../config/baseAPI";

export const response_create = async ({question_id,user,content} : any) => {
    try {
        const {data} = await baseAPI.post(`/api/answer/`, {
            user,
            question_id,
            content
        });
        return data;
    } catch (e: any) {
        return e?.response?.data;
    }
}

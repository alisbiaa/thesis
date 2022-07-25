import baseAPI from "../utils/baseAPI";

export const subject_get_all = async (id:string|undefined) => {
    if(!id) return;
    try {
        const {data} = await baseAPI.get(`/subject/get_all/${id}`);
        return data;
    } catch (e:any) {
        return e?.response?.data;
    }
}

export const subject_create = async (name:string,department_id:string,description:string) => {
    try {
        const {data} = await baseAPI.post(`/subject/`, {
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
        const {data} = await baseAPI.get(`/subject/get_one/${id}`);
        return data;
    } catch (e: any) {
        return e?.response?.data;
    }
};

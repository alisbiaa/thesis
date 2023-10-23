import baseAPI from "../config/baseAPI";

export const subject_get_all_by_department = async (id:string|undefined) => {
    if(!id) return;
    try {
        const {data} = await baseAPI.get(`/api/subject/get_all/${id}`);
        return data;
    } catch (e:any) {
        return e?.response?.data;
    }
}

export const subject_get_all = async () => {
    try {
        const {data} = await baseAPI.get(`/api/subject`);
        return data;
    } catch (e:any) {
        return e?.response?.data;
    }
}


export const subject_create = async (name:string,department_id:string,description:string) => {
    try {
        const {data} = await baseAPI.post(`/api/subject/`, {
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
        const {data} = await baseAPI.get(`/api/subject/get_one/${id}`);
        return data;
    } catch (e: any) {
        return e?.response?.data;
    }
};

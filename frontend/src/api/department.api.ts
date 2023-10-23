import {IDepartment} from "../static/interfaces";
import baseAPI from "../config/baseAPI";

export const department_get_all = async () => {
    try {
        const {data} = await baseAPI.get(`/api/department`);
        return data;
    } catch (e:any) {
        return e?.response?.data;
    }
}

export const department_get_one = async (id:string|undefined) => {
    if(!id) return;
    try {
        const {data} = await baseAPI.get(`/api/department/${id}`);
        return data;
    } catch (e:any) {
        return e?.response?.data;
    }
}

export const department_create = async ({name, description} : IDepartment) => {
    try {
        const {data} = await baseAPI.post(`/api/department/`, {
            name,description
        });
        return data;
    } catch (e: any) {
        return e?.response?.data;
    }
};

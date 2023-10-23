import baseAPI from "../config/baseAPI";
import {IReport} from "../static/interfaces";

export const get_all_report = async () => {
    try {
        const {data} = await baseAPI.get(`/api/report`);
        return data;
    } catch (e: any) {
        return e?.response?.data;
    }
};


export const create_report = async (report : IReport) => {
    try {
        const {data} = await baseAPI.post(`/api/report/`, report);
        return data;
    } catch (e: any) {
        return e?.response?.data;
    }
};


export const delete_report = async (id : string) => {
    try {
        const {data} = await baseAPI.delete(`/api/report/${id}`);
        return data;
    } catch (e: any) {
        return e?.response?.data;
    }
};
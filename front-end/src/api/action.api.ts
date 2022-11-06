import baseAPI from "../config/baseAPI";
import {IUser} from "../static/interfaces";

export const set_user_role = async (requester: string, email: string, role: IUser["role"]) => {
    if (!role || !requester || !email) return;
    try {
        const {data} = await baseAPI.put(`/action/set_role`, {
            requester,
            email,
            role
        });
        return data;
    } catch (e: any) {
        return e?.response?.data;
    }
};

export const ban_user = async (requester: string, email: string) => {
    if (!requester || !email) return;
    try {
        const {data} = await baseAPI.put(`/action/ban`, {
            requester,
            email,
        });
        return data;
    } catch (e: any) {
        return e?.response?.data;
    }
};

export const unban_user = async (requester: string, email: string) => {
    if (!requester || !email) return;
    try {
        const {data} = await baseAPI.put(`/action/unban`, {
            requester,
            email,
        });
        return data;
    } catch (e: any) {
        return e?.response?.data;
    }
};

export const update_question_important = async (requester: string, id: string, important:boolean) => {
    if (!requester) return;
    try {
        const {data} = await baseAPI.put(`/action/question/important`, {
            requester,id,important
        });
        return data;
    } catch (e: any) {
        return e?.response?.data;
    }
};

export const update_question_hidden = async (requester: string, id: string, hidden:boolean) => {
    if (!requester) return;
    try {
        const {data} = await baseAPI.put(`/action/question/hidden`, {
            requester,id,hidden
        });
        return data;
    } catch (e: any) {
        return e?.response?.data;
    }
};

export const update_answer_approved = async (requester: string, id: string, approve:boolean) => {
    if (!requester) return;
    try {
        const {data} = await baseAPI.put(`/action/answer/approve`, {
            requester,id,approve
        });
        return data;
    } catch (e: any) {
        return e?.response?.data;
    }
};



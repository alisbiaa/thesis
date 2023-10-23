import baseAPI from "../config/baseAPI";

export const login_create_api = async ({email, name}: any) => {
    if (!email) return;
    try {
        const {data} = await baseAPI.post(`/user`, {email, name});
        return data;
    } catch (e: any) {
        return e?.response?.data;
    }
};

export const get_user = async (email: string) => {
    if (!email) return;
    try {
        const {data} = await baseAPI.get(`/user/${email}`);
        return data;
    } catch (e: any) {
        return e?.response?.data;
    }
};


export const update_user = async ({email, bio}: any) => {
    if (!email) return;
    try {
        const {data} = await baseAPI.put(`/user/${email}`, {bio});
        return data;
    } catch (e: any) {
        return e?.response?.data;
    }
};

export const teacher_get_all_by_department = async (id: string) => {
    if (!id) return;
    try {
        const {data} = await baseAPI.get(`/user/department/${id}`);
        return data;
    } catch (e: any) {
        return e?.response?.data;
    }
};

export const get_all_users = async () => {
    try {
        const {data} = await baseAPI.get(`/user`);
        return data;
    } catch (e: any) {
        return e?.response?.data;
    }
};
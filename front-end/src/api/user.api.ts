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

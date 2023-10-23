import baseAPI from "../config/baseAPI";

export const home_get = async (accessToken:string,) => {
    try {
        const bearer = `Bearer ${accessToken}`;

        const {data} = await baseAPI.get(`/`, {
            headers : {
                "Authorization" : bearer
            }
        });
        return data;
    } catch (e:any) {
        return e?.response?.data;
    }
}

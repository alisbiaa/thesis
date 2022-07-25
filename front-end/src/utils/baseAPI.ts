import axios from "axios";

const {
    REACT_APP_BACKEND_ENDPOINT
} = process.env;

const api = axios.create({
    baseURL : REACT_APP_BACKEND_ENDPOINT,
    headers : {

    }
});

export default api;



// export const teacher_get_one = async (email: string | undefined) => {
//     if (!email) return;
//     try {
//         const {data} = await axios.get(`${end_point}/user/teacher/${email}`);
//         return data;
//     } catch (e: any) {
//         return e?.response?.data;
//     }
// };
//
// export const teacher_create = async ({department_id,name,last_name,email,bio}:ITeacher) => {
//     try{
//         const {data} = await axios.post(`${end_point}/user/teacher/`,{
//             email,
//             bio,
//             last_name,
//             name,
//             department_id
//         });
//         return data;
//     } catch (e:any) {
//         return e?.response?.data;
//     }
//
// }
//
// export const teacher_get_all = async () => {
//     try {
//         const {data} = await axios.get(`${end_point}/user/teacher`);
//         return data;
//     } catch (e:any) {
//         return e?.response?.data;
//     }
// }
//
// export const teacher_get_all_by_department = async(id:string|undefined)=> {
//     if(!id) return;
//     try {
//         const {data} = await axios.get(`${end_point}/user/teacher/department/${id}`);
//         return data;
//     } catch (e:any) {
//         return e?.response?.data;
//     }
// }
//
//
//


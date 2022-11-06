import axios from "axios";

const {
    REACT_APP_BACKEND_ENDPOINT
} = process.env;

const api = axios.create({
    baseURL : REACT_APP_BACKEND_ENDPOINT,
});

export default api;

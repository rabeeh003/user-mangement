import axios from "axios";
import { BaseUrl } from "../const/urls";

const AxiosAdmin = axios.create({
    baseURL: BaseUrl,
});

AxiosAdmin.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('admin-token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default AxiosAdmin;
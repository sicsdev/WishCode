import axios from "axios";

const axiosConfig = axios.create({
    // baseURL: 'http://127.0.0.1:8000/api',
    baseURL: 'https://dev1.wishtrax.com/api',
});
    // export const imageBaseUrl = 'http://127.0.0.1:8000';
 export const imageBaseUrl = 'https://dev1.wishtrax.com';
export default axiosConfig;


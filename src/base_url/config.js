import axios from "axios";

const axiosConfig = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    // baseURL: 'http://137.184.128.65/api',
});
    export const imageBaseUrl = 'http://127.0.0.1:8000';
//  export const imageBaseUrl = 'http://137.184.128.65';
export default axiosConfig;
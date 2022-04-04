import axios from "axios";

const axiosConfig = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    // baseURL: 'https://sicsdev.com/wishtrax/api',
});
    export const imageBaseUrl = 'http://127.0.0.1:8000';
//  export const imageBaseUrl = 'https://sicsdev.com/wishtrax';
export default axiosConfig;
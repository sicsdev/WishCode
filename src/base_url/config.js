import axios from "axios";

const axiosConfig = axios.create({
    // baseURL: 'http://127.0.0.1:8000/api',
    baseURL: 'http://dev1.wishtrax.com/api',
});
    // export const imageBaseUrl = 'http://127.0.0.1:8000';
<<<<<<< HEAD
 export const imageBaseUrl = 'https://demo.wishtrax.com/';
export default axiosConfig;
=======
 export const imageBaseUrl = 'http://dev1.wishtrax.com';
export default axiosConfig;
>>>>>>> e38aa713cd5cfb9ac8bdb9b3bff54d05762f63f4

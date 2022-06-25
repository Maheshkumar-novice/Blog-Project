import axios from 'axios';

let baseURL = 'http://127.0.0.1:5000';
export const axiosInstance = axios.create({
    baseURL
});


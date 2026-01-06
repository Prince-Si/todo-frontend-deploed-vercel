import axios from 'axios';


export const apiClient = axios.create(
    {
        baseURL: 'http://129.154.252.168:8081'
    }
);

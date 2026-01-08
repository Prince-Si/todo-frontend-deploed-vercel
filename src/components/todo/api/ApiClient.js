import axios from 'axios';


export const apiClient = axios.create(
    {
        baseURL: 'http://localhost:8081'
        //baseURL: 'https://todoapi-oci.princesingh.co.in'
    }
);

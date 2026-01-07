import axios from 'axios';


export const apiClient = axios.create(
    {
        baseURL: 'https://todoapi-oci.princesingh.co.in'
    }
);

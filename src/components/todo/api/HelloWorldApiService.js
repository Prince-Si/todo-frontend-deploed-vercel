import { apiClient } from "./ApiClient";


// export function retrieveHelloWorldBean(){
//     return axios.get('http://localhost:8001/hello-world-bean')
// }

//easier syntax:

// export const retrieveHelloWorldBean = () =>
//         axios.get('http://localhost:8081/hello-world-bean');

// export const retrieveHelloWorldPathVariable = (username) =>
//         axios.get(`http://localhost:8081/hello-world/path-variable/${username}`);


export const retrieveHelloWorldBean = () =>
        apiClient.get('/hello-world-bean');

export const retrieveHelloWorldPathVariable = (username, token) =>
        apiClient.get(`/hello-world/path-variable/${username}`,{
            headers:{
                Authorization: token
            }
        });



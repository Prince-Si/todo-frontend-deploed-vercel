import {apiClient} from './ApiClient';


export const retrieveAllTodosForUsernameApi = (username) =>
        apiClient.get(`/users/${username}/todos`);

export const deleteTodoApi = (username,id) =>
        apiClient.delete(`/users/${username}/todos/${id}`);

export const retrieveTodoApi = (username,id) =>
        apiClient.get(`/users/${username}/todos/${id}`);

export const updateTodoApi = (username,id, todo) =>
        apiClient.put(`/users/${username}/todos/${id}`, todo); //todo will go in the body of the request

export const createTodoApi = (username, todo) =>
        apiClient.post(`/users/${username}/todos`, todo); //todo will go in the body of the request

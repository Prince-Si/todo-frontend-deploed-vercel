import { useEffect, useState } from 'react';
import { retrieveAllTodosForUsernameApi, deleteTodoApi } from './api/TodoApiService'
import { useAuth } from "./security/AuthContext";
import { useNavigate } from "react-router-dom";

function ListTodosComponent() {

    const today = new Date();;
    const targetDate = new Date(today.getFullYear() + 12, today.getMonth(), today.getDay())
    const [todos, setTodos] = useState([]);
    const [message, setMessage] = useState(null);
    const authContext = useAuth();
    const username = authContext.username;
    const navigate = useNavigate();
    // const todos = [{ id: 1, description: 'Learn AWS', done: false, targetDate: targetDate },
    // { id: 2, description: 'Learn Full Stack Dev.', done: false, targetDate: targetDate },
    // { id: 3, description: 'Learn DevOps', done: false, targetDate: targetDate }
    // ]

    useEffect(() => refreshTodos(), [])

    function refreshTodos() {
        retrieveAllTodosForUsernameApi(username)
            .then(response => {
                console.log(response)
                setTodos(response.data);
            })

            .catch(error => console.log(error))
    }

    function deleteTodo(id) {

        deleteTodoApi(username, id)
            .then(
                () => {
                    setMessage(`Delete of todo with id = ${id} successful`)
                    refreshTodos()
                }
            )
            .catch(error => console.log(error))
    }

    function updateTodo(id) {
        navigate(`/todo/${id}`);
    }

    function addNewTodo() {
        navigate(`/todo/-1`);
    }

    return (
        <div className="mx-auto max-w-7xl px-4 py-6">
            <h1 className="mb-6 text-2xl font-bold text-gray-300">
                Things you want to do!
            </h1>

            {/* Warning Message */}
            {message && (
                <div className="mb-4 rounded-lg border border-yellow-400/30 bg-yellow-400/10 px-4 py-3 text-yellow-700">
                    {message}
                </div>
            )}

            {/* Responsive Table Wrapper */}
            <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="min-w-full border-collapse text-sm">
                    <thead className="bg-gray-100 text-left text-gray-700">
                        <tr>
                            <th className="px-4 py-3 font-semibold">Description</th>
                            <th className="px-4 py-3 font-semibold">Is Done?</th>
                            <th className="px-4 py-3 font-semibold">Target Date</th>
                            <th className="px-4 py-3 font-semibold text-center">Delete</th>
                            <th className="px-4 py-3 font-semibold text-center">Update</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        {todos.map((todo) => (
                            <tr key={todo.id} className="hover:bg-gray-800">
                                <td className="px-4 py-3">{todo.description}</td>
                                <td className="px-4 py-3">
                                    {todo.done ? "Yes" : "No"}
                                </td>
                                <td className="px-4 py-3">
                                    {todo.targetDate.toString()}
                                </td>

                                <td className="px-4 py-3 text-center">
                                    <button
                                        onClick={() => deleteTodo(todo.id)}
                                        className="rounded-xl w-24 bg-red-500 px-3 py-1.5 text-white hover:bg-red-600 transition"
                                        aria-label="Delete todo"
                                    >
                                        🗑️
                                    </button>
                                </td>

                                <td className="px-4 py-3 text-center">
                                    <button
                                        onClick={() => updateTodo(todo.id)}
                                        className="rounded-xl w-24 bg-yellow-500 px-3 py-1.5 text-white hover:bg-yellow-600 transition"
                                        aria-label="Update todo"
                                    >
                                        ✏️
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add New Todo Button */}
            <div className="mt-6 flex justify-center">
                <button
                    onClick={addNewTodo}
                    className="m-5 w-40 rounded-lg bg-green-600 px-6 py-2.5 font-medium text-white shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 active:scale-95 transition"
                >
                    Add New Todo
                </button>
            </div>
        </div>

    )
}

export default ListTodosComponent;
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { retrieveTodoApi, updateTodoApi, createTodoApi } from './api/TodoApiService';
import { useAuth } from './security/AuthContext';
import moment from 'moment';

export default function TodoComponent() {

    const { id } = useParams();
    const authContext = useAuth();
    const username = authContext.username;
    const [description, setDescription] = useState('');
    const [targetDate, setTargetDate] = useState('');
    const navigate = useNavigate();


    useEffect(
        () => retrieveTodo(), [id]
    );

    function retrieveTodo() {

        if (id != -1) {
            retrieveTodoApi(username, id)
                .then(response => {
                    setDescription(response.data.description);
                    setTargetDate(response.data.targetDate);
                })
                .catch(error => console.log(error))
        }
    }

    function onSubmit(values) {
        console.log(values);
        const todo = {
            id: id,
            username: username,
            description: values.description,
            targetDate: values.targetDate,
            done: false
        }

        if (id == -1) {
            createTodoApi(username, todo)
                .then(response => {

                    navigate('/todos');
                })
                .catch(error => console.log(error))
        }
        else {
            updateTodoApi(username, id, todo)
                .then(response => {
                    //console.log(response);
                    navigate('/todos');
                })
                .catch(error => console.log(error))
        }
    }

    function validate(values) {
        let errors = {

        };

        if (values.description.length < 5) {
            errors.description = 'Enter atleast 5 characters';
        }

        if (values.targetDate == null || values.targetDate == '' || !moment(values.targetDate).isValid()) {
            errors.targetDate = 'Target date cannot be null';
        }

        return errors;
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Enter Todo Details</h1>
            <div>
                <Formik
                    initialValues={{ description, targetDate }}
                    enableReinitialize={true}
                    onSubmit={onSubmit}
                    validate={validate}
                    validateOnChange={false}
                    validateOnBlur={false}
                >
                    {(props) => (
                        <Form className="space-y-4">
                            <ErrorMessage
                                name="description"
                                component="div"
                                className="text-yellow-700 bg-yellow-100 p-2 rounded"
                            />
                            <fieldset className="flex flex-col">
                                <label className="mb-2 font-medium text-gray-300">Description</label>
                                <Field
                                    type="text"
                                    className="border text-black border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    name="description"
                                />
                            </fieldset>

                            <ErrorMessage
                                name="targetDate"
                                component="div"
                                className="text-yellow-700 bg-yellow-100 p-2 rounded"
                            />
                            <fieldset className="flex flex-col">
                                <label className="mb-2 font-medium text-gray-300">Target Date</label>
                                <Field
                                    type="date"
                                    className="border text-black border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    name="targetDate"
                                />
                            </fieldset>

                            <div className="mt-4">
                                <button
                                    className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded transition-colors"
                                    type="submit"
                                >
                                    Save
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>

    )
}
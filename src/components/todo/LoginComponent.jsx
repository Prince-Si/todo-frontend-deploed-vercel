import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './security/AuthContext';
function LoginComponent() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const navigate = useNavigate();
    const authContext = useAuth();

    function handleUsernameChange(event) {
        //console.log(event);
        //console.log(event.target.value);
        setUsername(event.target.value); //since now form field is tied to the state this is known as controlled
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    async function handleSubmit() {
        console.log(username);
        console.log(password);
        if (await authContext.login(username, password)) {
            navigate(`/welcome/${username}`); // this in28minutes is not part of url but it is the param. tick is used insted of quote when a variable is there

        } else {
            setShowErrorMessage(true);
        }
    }
    /*
    function SuccessMessageComponent(){
    if(showSuccessMessage){
        return <div className="successMessage">Authenticated Successfully</div>
    }
    return null
    }   

    function ErrorMessageComponent(){
    if(showErrorMessage){
        return <div className="errrorMessage">Authenticated Failed. Please Check you credentials.</div>
    }
    return null
    }
    //to create a compnenet for this small requirement is not the correct approach
    */

    return (
        <div className="Login">
            <h1>Time to login!</h1>
            {/* <SuccessMessageComponent/>
            <ErrorMessageComponent/> */}
            {showErrorMessage && (
                <div
                    role="alert"
                    className="mx-auto mt-4 flex max-w-sm items-start gap-3 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-400 mb-3"
                >
                    <span className="text-xl leading-none">⚠️</span>
                    <div>
                        <p className="font-medium">Authentication failed</p>
                        <p className="text-sm text-red-300">
                            Invalid username or password.
                        </p>
                    </div>
                </div>
            )}


            <div className="LoginForm bg-gray-900 p-6 rounded-lg shadow-lg w-96 mx-auto">
                {/* Username row */}
                <div className="flex items-center mb-4">
                    <label className="w-24 text-gray-300 text-sm">User Name</label>
                    <input
                        className="flex-1 text-black shadow-md border rounded-lg p-2 text-sm"
                        type="text"
                        name="username"
                        value={username}
                        onChange={handleUsernameChange}
                    />
                </div>

                {/* Password row */}
                <div className="flex items-center mb-4">
                    <label className="w-24 text-gray-300 text-sm">Password</label>
                    <input
                        className="flex-1 text-black shadow-md border rounded-lg p-2 text-sm"
                        type="password"
                        name="password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>

                {/* Button row */}
                <div className="flex justify-end">
                    <button
                        type="button"
                        name="login"
                        onClick={handleSubmit}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 text-sm"
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    )
}


export default LoginComponent;
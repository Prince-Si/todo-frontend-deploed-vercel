import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAuth} from './security/AuthContext';
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
        if (await authContext.login(username,password)) {
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
            {showErrorMessage && <div className="errrorMessage" style={{color: "red"}}>Authenticated Failed. Please Check you credentials.</div>}
            <div className="LoginForm">
                <div>
                    <label>User Name</label>
                    <input type="text" name="username" value={username} onChange={handleUsernameChange} />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="password" value={password} onChange={handlePasswordChange} />
                </div>
                <div>
                    <button type="button" name="login" onClick={handleSubmit}>Login</button>
                </div>
            </div>
        </div>
    )
}


export default LoginComponent;
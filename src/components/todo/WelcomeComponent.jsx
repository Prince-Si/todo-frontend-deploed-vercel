import {useState} from 'react';
import {useParams, Link} from 'react-router-dom';
import {retrieveHelloWorldBean, retrieveHelloWorldPathVariable} from './api/HelloWorldApiService';
//axios is used to call the rest api's another one is 'fetch'
import {useAuth} from './security/AuthContext';


function WelcomeComponent() {

    //const params = useParams();
    const { username } = useParams(); //deconstructing the object

    const [message, setMessage] = useState(null);
    
    const authContext = useAuth();

    function callHelloWorldRestApi(){
        // axios.get('http://localhost:8081/hello-world')
        //     .then((response) => successfulResponse(response))  //promises
        //     .catch((error)=> errorResponse(error))
        //     .finally(()=> console.log('cleanup'))


        // retrieveHelloWorldBean()
        //     .then((response) => successfulResponse(response))  //promises
        //     .catch((error)=> errorResponse(error))
        //     .finally(()=> console.log('cleanup'))

        retrieveHelloWorldPathVariable('Prince', authContext.token)
            .then((response) => successfulResponse(response))  //promises
            .catch((error)=> errorResponse(error))
            .finally(()=> console.log('cleanup'))
    }

    function successfulResponse(response){
        console.log(response.data.message);
        setMessage(response.data.message);
    }
    function errorResponse(error){
        console.log(error);
    }
    return (
        <div className="WelcomeComponent">
            <h1>Welcome {username}</h1>
            <div>
                Manage Your todos - <Link to="/todos">Go Here</Link>
            </div>
            <div>
                <button className="btn btn-success m-5" onClick={callHelloWorldRestApi}>Call Hello World</button>
            </div>
            <div className="text-info">{message}</div>
        </div>
    )
}

export default WelcomeComponent;
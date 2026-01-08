import { createContext, useState, useContext } from 'react';
import { executeBasicAuthenticationService,executeJwtAuthenticationService } from '../api/AuthenticationApiService';
import { apiClient } from '../api/ApiClient';

//Create a Context
export const AuthContext = createContext();

//since we need to use it again and again we will create a hook instead of initializing it in every component
//creating a hook
export const useAuth = () => useContext(AuthContext );

//share the created context with other components
export default function AuthProvider({ children }){ //provides auth context to all the childrens of the auth provider

    //put some state in the context
    //const [number, setNumber] = useState(0);
    const [isAuthenticated, setAuthenticated] = useState(false);
    const [username,setUsername] = useState(null);
    //setInterval(()=>setNumber(number+1),1000);//every 1000 millisecond ie every second increment the number

    const [token,setToken] = useState(null);

    //const valuesToBeShared = {number, isAuthenticated, SetAuthenticated};
    // function login(username, password){
    //     if (username === 'in28minutes' && password === 'dummy') {
    //         setAuthenticated(true);
    //         setUsername(username);
    //         return true;
    //     } else {
    //         setAuthenticated(false);
    //         setUsername(null);
    //         return false;
    //     }
    // }
    //the above was hardcoded auth. now its time to make it dynamic
    
    //Basic Authentication Token
    // async function login(username, password){
        
    //     const baToken = 'Basic ' + window.btoa(username + ":" + password)  //base 64 encoding using window.btoa
        
    //     try{
    //     const response = await executeBasicAuthenticationService(baToken)
    //     // .then(response => console.log(response))
    //     // .catch(error => console.log(error))

    //     setAuthenticated(false);

    //     if (response.status==200) {
    //         setAuthenticated(true);
    //         setUsername(username);
    //         setToken(baToken);

    //         apiClient.interceptors.request.use( //adding an authorization header to request with token
    //             (config) => {
    //                 console.log('intercepting and adding a token');
    //                 config.headers.Authorization = baToken;
    //                 return config;
    //             }
    //         )
    //         return true;
    //     } else {
    //         logout();
    //         return false;
    //     }
    // }catch(error){
    //         logout();
    //         return false;
    // }
    // }


    //new login method using jwt auth api
    async function login(username, password){
        
        
        try{
        const response = await executeJwtAuthenticationService(username, password)

        setAuthenticated(false);

        if (response.status==200) {

            const jwtToken = 'Bearer ' + response.data.token;
            setAuthenticated(true);
            setUsername(username);
            setToken(jwtToken); //jwt token received from backend

            apiClient.interceptors.request.use( 
                (config) => {
                    console.log('intercepting and adding a token');
                    config.headers.Authorization = jwtToken;
                    return config;
                }
            )
            return true;
        } else {
            setAuthenticated(false);
            return false;
        }
    }catch(error){
            setAuthenticated(false);
            return false;
    }
    }

    function logout(){
        AuthContext.setAuthenticated(false);
        setToken(null);
        setUsername(null);
    }

    return(
        <AuthContext.Provider value={{isAuthenticated, login, logout, username, token}}>
            {children}
        </AuthContext.Provider>
    )
}

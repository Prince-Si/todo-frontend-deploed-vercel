import './TodoApp.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LogoutComponent from './LogoutComponent';
import FooterComponent from './FooterComponent';
import HeaderComponent from './HeaderComponent';
import ListTodosComponent from './ListTodosComponent';
import ErrorComponent from './ErrorComponent';
import WelcomeComponent from './WelcomeComponent';
import LoginComponent from './LoginComponent';
import AuthProvider from './security/AuthContext';
import {useAuth} from './security/AuthContext';
import TodoComponent from './TodoComponent';


function AuthenticatedRoute({children}){
    const authContext = useAuth()
    if(authContext.isAuthenticated){
        return children;
    }

    return <Navigate to='/' />
}


export default function TodoApp() {

    return (
        <div className="TodoApp">
            <AuthProvider>
            <BrowserRouter>
            <div className="flex flex-col min-h-screen">
                <HeaderComponent />
                <main className="flex-grow">
                <Routes>
                    <Route path='/' element={<LoginComponent />}></Route>
                    <Route path='/login' element={<LoginComponent />}></Route>
                    
                    <Route path='/welcome/:username' element={
                        <AuthenticatedRoute>
                            <WelcomeComponent />
                        </AuthenticatedRoute>
                    }></Route>

                    <Route path='/todos' element={
                        <AuthenticatedRoute>
                            <ListTodosComponent />
                        </AuthenticatedRoute>
                    }></Route>

                    <Route path='/todo/:id' element={
                        <AuthenticatedRoute>
                            <TodoComponent />
                        </AuthenticatedRoute>
                    }></Route>

                    <Route path='/logout' element={<LogoutComponent />}></Route>

                    <Route path='*' element={<ErrorComponent />} />
                </Routes>
                </main>
                <FooterComponent />
            </div>
            </BrowserRouter>
            </AuthProvider>

        </div>
    )
}
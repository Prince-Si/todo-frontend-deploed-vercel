import { Link } from 'react-router-dom';
import { useAuth } from './security/AuthContext';

function HeaderComponent() {

    const authContext = useAuth();
    const isAuthenticated = authContext.isAuthenticated;

    function logout() {
        authContext.logout();
    }

    return (
        <header className="border-bottom border-light border-5 mb-3">
            <nav className="navbar navbar-expand-lg navbar-light bg-white px-3">
                
                {/* Brand */}
                <Link className="navbar-brand fs-2 fw-bold text-black" to="/">
                    TaskSphere
                </Link>

                {/* Hamburger Button */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarContent"
                    aria-controls="navbarContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Collapsible Content */}
                <div className="collapse navbar-collapse" id="navbarContent">
                    
                    {/* Left Links */}
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {isAuthenticated && (
                            <>
                                <li className="nav-item">
                                    <Link
                                        className="nav-link"
                                        to={`/welcome/${authContext.username}`}
                                    >
                                        Home
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link className="nav-link" to="/todos">
                                        Todos
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>

                    {/* Right Links */}
                    <ul className="navbar-nav">
                        {!isAuthenticated && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">
                                    Login
                                </Link>
                            </li>
                        )}

                        {isAuthenticated && (
                            <li className="nav-item">
                                <Link
                                    className="nav-link"
                                    to="/logout"
                                    onClick={logout}
                                >
                                    Logout
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </nav>
        </header>
    );
}

export default HeaderComponent;

import { Link } from "react-router-dom";
import { useAuth } from "./security/AuthContext";
import { useState } from "react";
import FullLogo from '../../assets/FullLogo.png';

function HeaderComponent() {
  const { isAuthenticated, username, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="border-b border-gray-800">
      <nav className="w-full bg-gray-950 backdrop-blur z-50">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex h-16 items-center gap-6">

            {/* BRAND (always visible) */}
            <Link
              to="/"
              className="text-2xl font-bold text-white no-underline"
            >
              <img src={FullLogo}  alt="TaskSphere" className="h-8 w-auto object-contain md:h-9"/>
            </Link>

            {/* DESKTOP: Home + Todos */}
            {isAuthenticated && (
              <div className="hidden lg:flex items-center gap-6">
                <Link
                  to={`/welcome/${username}`}
                  className="text-gray-300 hover:text-white no-underline"
                >
                  Home
                </Link>
                <Link
                  to="/todos"
                  className="text-gray-300 hover:text-white no-underline"
                >
                  Todos
                </Link>
              </div>
            )}

            {/* DESKTOP: Login / Logout (right aligned) */}
            <div className="ml-auto hidden lg:flex items-center gap-6">
              {!isAuthenticated && (
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-white no-underline"
                >
                  Login
                </Link>
              )}

              {isAuthenticated && (
                <Link
                  to="/logout"
                  onClick={logout}
                  className="text-gray-300 hover:text-white no-underline"
                >
                  Logout
                </Link>
              )}
            </div>

            {/* MOBILE: Hamburger */}
            <button
              className="ml-auto lg:hidden inline-flex items-center justify-center rounded-md border border-gray-600 p-2 text-gray-200 hover:bg-gray-800"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="lg:hidden border-t border-gray-800 bg-gray-950 px-4 py-3 space-y-2">

            {isAuthenticated && (
              <>
                <Link
                  to={`/welcome/${username}`}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-md px-3 py-2 text-gray-300 hover:bg-gray-800 no-underline"
                >
                  Home
                </Link>

                <Link
                  to="/todos"
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-md px-3 py-2 text-gray-300 hover:bg-gray-800 no-underline"
                >
                  Todos
                </Link>
              </>
            )}

            {!isAuthenticated && (
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="block rounded-md px-3 py-2 text-gray-300 hover:bg-gray-800 no-underline"
              >
                Login
              </Link>
            )}

            {isAuthenticated && (
              <Link
                to="/logout"
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="block rounded-md px-3 py-2 text-gray-300 hover:bg-gray-800 no-underline"
              >
                Logout
              </Link>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}

export default HeaderComponent;

import { React,useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { User } from "lucide-react";
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router';


const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="flex justify-between items-center h-20 px-4 py-3">
      <h1 className="text-3xl font-extrabold text-[var(--quad)]">Peer<span className="text-[#FBC923]">zz</span></h1>
      <div className="flex gap-2 items-center">
        <ThemeToggle />
        <div className="relative">
          <button
            className="flex items-center justify-center w-10 h-10 rounded border-2 border-[var(--tri)] text-[var(--tri)] focus:outline-none"
            onClick={() => setShowDropdown((prev) => !prev)}
            aria-label="User menu"
          >
            <User />
          </button>
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-40 bg-[var(--bi)] rounded shadow-lg z-10 py-2">
              {isAuthenticated ? (
                <>
                  <a href="/profile" className="block px-4 py-2 text-sm text-[var(--tri)] hover:bg-[var(--uni)]">Profile</a>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-[var(--tri)] hover:bg-[var(--uni)]"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <a href="/login" className="block px-4 py-2 text-sm text-[var(--tri)] hover:bg-[var(--uni)]">Login</a>
                  <a href="/register" className="block px-4 py-2 text-sm text-[var(--tri)] hover:bg-[var(--uni)]">Sign Up</a>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );

};

export default Header;

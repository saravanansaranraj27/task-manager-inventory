import { useState, useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ showMinimal = false }) {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/home" className="logo">
          Task Manager
        </Link>
        {!showMinimal && (
          <>
            <Link to="/home" className="nav-link">
              Home
            </Link>
            <Link to="/tasks" className="nav-link">
              Tasks
            </Link>
            <Link to="/profile" className="nav-link">
              Profile
            </Link>
            <Link to="/inventory" className="nav-link">
              Inventory
            </Link>
            {user?.role === "admin" && (
              <Link to="/admin" className="nav-link">
                Admin
              </Link>
            )}
          </>
        )}
      </div>

      <div className="nav-right">
        <button onClick={toggleTheme} className="theme-toggle">
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>

        {user && (
          <div className="dropdown" ref={dropdownRef}>
            <button
              className="dropdown-toggle"
              onClick={() => setShowDropdown((prev) => !prev)}
            >
              👤 {user.username}
            </button>
            {showDropdown && (
              <div className="dropdown-menu">
                <button
                  onClick={() => {
                    navigate("/profile");
                    setShowDropdown(false);
                  }}
                >
                  Profile
                </button>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

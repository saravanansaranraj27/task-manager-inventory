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
    <nav className="navbar" aria-label="Primary navigation">
      <div className="nav-left">
        <Link to="/intro" className="logo">
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
        <button
          onClick={toggleTheme}
          className="theme-toggle"
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          <span className="theme-icon" aria-hidden="true">
            {theme === "light" ? "☾" : "☀"}
          </span>
          {theme === "light" ? " Dark" : " Light"}
        </button>

        {user && (
          <div className="dropdown" ref={dropdownRef}>
            <button
              className="dropdown-toggle"
              onClick={() => setShowDropdown((prev) => !prev)}
              aria-expanded={showDropdown}
              aria-haspopup="menu"
            >
              <span className="user-avatar" aria-hidden="true">
                {user.username.charAt(0).toUpperCase()}
              </span>
              <span>{user.username}</span>
              <span className="dropdown-chevron" aria-hidden="true">
                {showDropdown ? "⌃" : "⌄"}
              </span>
            </button>
            {showDropdown && (
              <div className="dropdown-menu" role="menu">
                <div className="dropdown-header">
                  <strong>{user.username}</strong>
                  <span>{user.role}</span>
                </div>
                <button
                  type="button"
                  role="menuitem"
                  className="dropdown-item"
                  onClick={() => {
                    navigate("/profile");
                    setShowDropdown(false);
                  }}
                >
                  <span aria-hidden="true">◉</span>
                  Profile
                </button>
                <button
                  type="button"
                  role="menuitem"
                  className="dropdown-item dropdown-logout"
                  onClick={handleLogout}
                >
                  <span aria-hidden="true">↪</span>
                  Log out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../hooks/useTheme";
import { ROUTES, USER_ROLES } from "../../constants/app";
import { getInitial } from "../../utils/userUtils";

const NAV_ITEMS = [
  { to: ROUTES.HOME, label: "Home" },
  { to: ROUTES.TASKS, label: "Tasks" },
  { to: ROUTES.PROFILE, label: "Profile" },
  { to: ROUTES.INVENTORY, label: "Inventory" },
];

function Navbar({ showMinimal = false }) {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setShowDropdown(false);
  }, [location.pathname]);

  function handleLogout() {
    logout();
    navigate(ROUTES.LOGIN);
  }

  const navItems =
    user?.role === USER_ROLES.ADMIN
      ? [...NAV_ITEMS, { to: ROUTES.ADMIN, label: "Admin" }]
      : NAV_ITEMS;

  function navLinkClass({ isActive }) {
    return `nav-link${isActive ? " active" : ""}`;
  }

  return (
    <nav className="navbar" aria-label="Primary navigation">
      <div className="nav-left">
        <NavLink
          to={ROUTES.INTRO}
          className="logo"
          onClick={() => setMobileMenuOpen(false)}
        >
          <svg
            className="logo-icon"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <rect
              x="3"
              y="4"
              width="18"
              height="17"
              rx="3"
              stroke="currentColor"
              strokeWidth="1.8"
            />
            <path
              d="M7 9h10M7 13h7"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <path
              d="M8 3v3M16 3v3"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
          <span>Task Manager</span>
        </NavLink>

        {!showMinimal && user && (
          <>
            <div className="nav-links-desktop">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={navLinkClass}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>

            <button
              type="button"
              className="nav-hamburger"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-drawer"
              onClick={() => setMobileMenuOpen((open) => !open)}
            >
              <span
                className={`hamburger-icon${mobileMenuOpen ? " open" : ""}`}
              >
                <span />
                <span />
                <span />
              </span>
            </button>
          </>
        )}
      </div>

      <div className="nav-right">
        <button
          type="button"
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
              type="button"
              className="dropdown-toggle"
              onClick={() => setShowDropdown((open) => !open)}
              aria-expanded={showDropdown}
              aria-haspopup="menu"
            >
              <span className="user-avatar" aria-hidden="true">
                {getInitial(user.username)}
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
                  onClick={() => navigate(ROUTES.PROFILE)}
                >
                  <span aria-hidden="true">◉</span> Profile
                </button>
                <button
                  type="button"
                  role="menuitem"
                  className="dropdown-item dropdown-logout"
                  onClick={handleLogout}
                >
                  <span aria-hidden="true">↪</span> Log out
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {!showMinimal && user && mobileMenuOpen && (
        <div id="mobile-nav-drawer" className="nav-mobile-drawer" role="menu">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={navLinkClass}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
}

export default Navbar;

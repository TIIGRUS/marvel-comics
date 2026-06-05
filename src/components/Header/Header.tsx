import { Link } from "react-router-dom";
import NavLink from "../NavLink/NavLink";
import { ThemeToggle } from "../ThemeToggle";
import { useAuthContext } from "../../hooks/useAuthContext";
import "./Header.scss";

function Header() {
  const { user, logout } = useAuthContext();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header className="header app__container">
      <h1 className="header__title">
        <Link to="/">
          <span>Marvel</span> information portal
        </Link>
      </h1>
      <nav className="header__menu">
        <ul className="header__menu-list">
          <li className="header__menu-item">
            <NavLink
              end
              className="header__menu-link"
              activeClassName="header__menu-link_active"
              to="/"
            >
              Characters
            </NavLink>
          </li>
          <li className="header__menu-item">
            <NavLink
              className="header__menu-link"
              activeClassName="header__menu-link_active"
              to="/comics"
            >
              Comics
            </NavLink>
          </li>
          {user && (
            <li className="header__menu-item">
              <NavLink
                className="header__menu-link"
                activeClassName="header__menu-link_active"
                to="/profile"
              >
                Profile
              </NavLink>
            </li>
          )}
        </ul>
      </nav>

      <ThemeToggle />

      <div className="header__auth">
        {user ? (
          <>
            <span className="header__user-name">{user.user_name}</span>
            <button
              className="button button_theme_main"
              type="button"
              onClick={handleLogout}
            >
              <span className="button__inner">Logout</span>
            </button>
          </>
        ) : (
          <>
            <ul className="header__menu-list header__menu-list_size_small">
              <li className="header__menu-item">
                <NavLink
                  className="header__menu-link"
                  activeClassName="header__menu-link_active"
                  to="/login"
                >
                  Login
                </NavLink>
              </li>
              <li className="header__menu-item">
                <NavLink
                  className="header__menu-link"
                  activeClassName="header__menu-link_active"
                  to="/register"
                >
                  Register
                </NavLink>
              </li>
            </ul>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;

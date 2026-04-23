import { Link } from "react-router-dom";
import "./Header.scss";
import NavLink from "../NavLink/NavLink";

function Header() {
  return (
    <header className="header app__container">
      <h1 className="header__title">
        <Link to="/">
          <span>Marvel</span> information portal
        </Link>
      </h1>
      <nav className="header__menu">
        <ul className="header__menu-list">
          <li>
            <NavLink
              end
              className="header__menu-item"
              activeClassName="header__menu-item_active"
              to="/"
            >
              Characters
            </NavLink>
          </li>
          /
          <li>
            <NavLink
              className="header__menu-item"
              activeClassName="header__menu-item_active"
              to="/comics"
            >
              Comics
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;

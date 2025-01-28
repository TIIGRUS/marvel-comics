import "./Header.scss"

function Header() {
    return (
        <header className="header app__container">
            <h1 className="header__title">
                <a href="/#">
                    <span>Marvel</span> information portal
                </a>
            </h1>
            <nav className="header__menu">
                <ul className="header__menu-list">
                    <li><a className="header__menu-item header__menu-item_active" href="/#">Characters</a></li>
                    /
                    <li><a className="header__menu-item" href="/#">Comics</a></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;
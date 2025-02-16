import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router";
import LoginContext from "../context/LoginContext.jsx";
import SearchForm from "./SearchForm.jsx";
import "../styles/navBar.css";

function NavBar() {
    const [loginOrUserPath, setLoginOrUserPath] = useState("/login");
    const [openUserMenu, setOpenUserMenu] = useState(false);
    const { loginInfo } = useContext(LoginContext);
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        // console.log("Checking status:", loginInfo);

        if (loginInfo.isAuthenticated) {
            setLoginOrUserPath("/user/" + loginInfo.id);
        }
    }, [loginInfo]);

    return (
        <header>
            <nav className="navbar-container">
                <div>
                    <NavLink to="/">
                        <img
                            className="bigger-image"
                            src="/icons/homeIcon.svg"
                            alt="Home"
                        />
                    </NavLink>
                </div>

                <SearchForm width={width} />

                {width <= 800 ? (
                    <div className="relative-modal user-menu">
                        {openUserMenu && (
                            <div className="absolute-search-modal user-menu-modal">
                                <NavLink to="/addPost">
                                    <img
                                        className="normal-image"
                                        src="/icons/addPostIcon.svg"
                                        alt="Add a Post"
                                    />
                                </NavLink>
                                <NavLink to="/favorites">
                                    <img
                                        className="normal-image"
                                        src="/icons/favorites.svg"
                                        alt="Favorited Elements"
                                    />
                                </NavLink>
                                <NavLink to={loginOrUserPath}>
                                    <img
                                        className="normal-image"
                                        src="/icons/userIcon.svg"
                                        alt={
                                            loginOrUserPath === "/login"
                                                ? "Login Page"
                                                : "Your Account"
                                        }
                                    />
                                </NavLink>
                            </div>
                        )}

                        <button
                            className="styled-button"
                            onClick={() => setOpenUserMenu(!openUserMenu)}
                        >
                            <img
                                className="small-image"
                                src="/icons/userIcon.svg"
                                alt="User Menu"
                            />
                        </button>
                    </div>
                ) : (
                    <div>
                        <NavLink to="/addPost">
                            <img
                                className="bigger-image"
                                src="/icons/addPostIcon.svg"
                                alt="Add a Post"
                            />
                        </NavLink>
                        <NavLink to="/favorites">
                            <img
                                className="bigger-image"
                                src="/icons/favorites.svg"
                                alt="Favorited Elements"
                            />
                        </NavLink>
                        <NavLink to={loginOrUserPath}>
                            <img
                                className="bigger-image"
                                src="/icons/userIcon.svg"
                                alt={
                                    loginOrUserPath === "/login"
                                        ? "Login Page"
                                        : "Your Account"
                                }
                            />
                        </NavLink>
                    </div>
                )}
            </nav>
        </header>
    );
}

export default NavBar;

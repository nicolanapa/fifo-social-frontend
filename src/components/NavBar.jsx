import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router";
import LoginContext from "../context/LoginContext.jsx";
import SearchForm from "./SearchForm.jsx";

function NavBar() {
    const [loginOrUserPath, setLoginOrUserPath] = useState("/login");
    const { loginInfo } = useContext(LoginContext);

    useEffect(() => {
        console.log("Checking status:", loginInfo);

        if (loginInfo.isAuthenticated) {
            setLoginOrUserPath("/user/" + loginInfo.id);
        }
    }, [loginInfo]);

    return (
        <header>
            <nav>
                <NavLink to="/">
                    <img src="/icons/homeIcon.svg" alt="Home" />
                </NavLink>
                <SearchForm />
                <NavLink to="/addPost">
                    <img src="/icons/addPostIcon.svg" alt="Add a Post" />
                </NavLink>
                <NavLink to="/favorites">
                    <img src="/icons/favorites.svg" alt="Favorited Elements" />
                </NavLink>
                <NavLink to={loginOrUserPath}>
                    <img
                        src="/icons/userIcon.svg"
                        alt={
                            loginOrUserPath === "/login"
                                ? "Login Page"
                                : "Your Account"
                        }
                    />
                </NavLink>
            </nav>
        </header>
    );
}

export default NavBar;

import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router";
import LoginContext from "../context/LoginContext.jsx";

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
                    <img src="./icons/homeIcon.svg" alt="Home" />
                </NavLink>
                <div>
                    <input type="text" />
                    <button type="submit">
                        <img src="./icons/searchIcon.svg" alt="Search" />
                    </button>
                </div>
                <NavLink to="/addPost">
                    <img src="./icons/addPostIcon.svg" alt="Add a Post" />
                </NavLink>
                <NavLink to={loginOrUserPath}>
                    <img
                        src="./icons/userIcon.svg"
                        alt="Your account or login page"
                    />
                </NavLink>
            </nav>
        </header>
    );
}

export default NavBar;

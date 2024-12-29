import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import { getLoginObject } from "../scripts/getLoginObject";
import LoginContext from "../context/LoginContext";
import NavBar from "./NavBar";

function App() {
    const [loginInfo, setLoginInfo] = useState({ isAuthenticated: false });

    useEffect(() => {
        async function fetchLoginStatus() {
            setLoginInfo(await getLoginObject());
        }

        fetchLoginStatus();
    }, []);

    return (
        <LoginContext.Provider value={{ loginInfo, setLoginInfo }}>
            <NavBar />
            <main>
                <Outlet />
            </main>
        </LoginContext.Provider>
    );
}

export default App;

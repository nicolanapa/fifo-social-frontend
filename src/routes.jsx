import { Outlet } from "react-router";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import LoginContext from "./context/LoginContext";
import { getLoginObject } from "./scripts/getLoginObject";

const tempLoginValue = await getLoginObject();

const routes = [
    {
        path: "/",
        element: (
            <LoginContext.Provider value={tempLoginValue}>
                <NavBar />
                <main>
                    <Outlet />
                </main>
            </LoginContext.Provider>
        ),
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "login",
                element: <Login />,
            },
        ],
    },
];

export { routes };

import { Outlet } from "react-router";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Login from "./components/Login";

const routes = [
    {
        path: "/",
        element: (
            <>
                <NavBar />
                <main>
                    <Outlet />
                </main>
            </>
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

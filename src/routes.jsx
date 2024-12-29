import Home from "./components/Home";
import Login from "./components/Login";
import App from "./components/App";

const routes = [
    {
        path: "/",
        element: <App />,
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

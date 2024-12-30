import Home from "./components/Home";
import Login from "./components/Login";
import App from "./components/App";
import AddPost from "./components/AddPost";

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
            {
                path: "addPost",
                element: <AddPost />,
            },
        ],
    },
];

export { routes };

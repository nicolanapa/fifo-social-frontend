import Home from "./components/Home";
import Login from "./components/Login";
import App from "./components/App";
import AddPost from "./components/AddPost";
import ErrorPage from "./components/ErrorPage";
import Page404 from "./components/Page404";

const routes = [
    {
        path: "/",
        element: <App />,
        errorElement: <Page404 />,
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
            {
                path: "errorPage",
                element: <ErrorPage />,
            },
        ],
    },
];

export { routes };

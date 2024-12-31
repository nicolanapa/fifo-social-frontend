import Home from "./components/Home";
import Login from "./components/Login";
import App from "./components/App";
import AddPost from "./components/AddPost";
import ErrorPage from "./components/ErrorPage";
import Page404 from "./components/Page404";
import User from "./components/User";
import Post from "./components/Post";

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
                path: "/user",
                children: [
                    {
                        path: "/user/:userId",
                        element: <User />,
                    },
                ],
            },
            {
                path: "/post",
                children: [
                    {
                        path: "/post/:postId",
                        element: <Post />,
                    },
                ],
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

import Home from "./components/Home";
import Login from "./components/Login";
import App from "./components/App";
import AddPost from "./components/AddPost";
import ErrorPage from "./components/ErrorPage";
import Page404 from "./components/Page404";
import User from "./components/User";
import Post from "./components/Post";
import Copyright from "./components/Copyright";
import AllUsersOrPosts from "./components/AllUsersOrPosts";
import Favorites from "./components/Favorites";
import AllFollowersOrFollowed from "./components/AllFollowersOrFollowed";

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
                element: <AllUsersOrPosts />,
            },
            {
                path: "/user/:userId",
                element: <User />,
                children: [
                    {
                        path: "/user/:userId/followers",
                        element: (
                            <AllFollowersOrFollowed typeOfX={"followers"} />
                        ),
                    },
                    {
                        path: "/user/:userId/followed",
                        element: (
                            <AllFollowersOrFollowed typeOfX={"followed"} />
                        ),
                    },
                ],
            },
            {
                path: "/post",
                element: <AllUsersOrPosts />,
            },
            {
                path: "/post/:postId",
                element: <Post />,
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
                path: "favorites",
                element: <Favorites />,
            },
            {
                path: "errorPage",
                element: <ErrorPage />,
            },
            {
                path: "copyright",
                element: <Copyright />,
            },
        ],
    },
];

export { routes };

import { useContext, useEffect } from "react";
import LoginContext from "../context/LoginContext";
import { getLoginObject } from "../scripts/getLoginObject";
import { Link } from "react-router";

function Favorites() {
    const { loginInfo, setLoginInfo } = useContext(LoginContext);

    async function fetchFavorites(id) {
        const responsePost = await fetch(
            import.meta.env.VITE_SERVER_DOMAIN +
                ":" +
                import.meta.env.VITE_SERVER_PORT +
                "/favorite/" +
                id +
                "/posts",
            {
                method: "GET",
                credentials: "include",
            }
        );

        const responseComment = await fetch(
            import.meta.env.VITE_SERVER_DOMAIN +
                ":" +
                import.meta.env.VITE_SERVER_PORT +
                "/favorite/" +
                id +
                "/comments",
            {
                method: "GET",
                credentials: "include",
            }
        );

        const responsePostObject = await responsePost.json();
        const responseCommentObject = await responseComment.json();

        console.log(responsePostObject, responseCommentObject);
    }

    useEffect(() => {
        async function fetchLoginStatus() {
            const updatedLoginInfo = await getLoginObject();
            setLoginInfo(updatedLoginInfo);

            if (updatedLoginInfo.isAuthenticated) {
                fetchFavorites(updatedLoginInfo.id);
            }
        }

        fetchLoginStatus();
    }, []);

    return (
        <>
            {loginInfo.isAuthenticated ? (
                <></>
            ) : (
                <div>
                    <h1>You&apos;re not logged in</h1>
                    <Link to="/login">Login or Signup</Link>
                </div>
            )}
        </>
    );
}

export default Favorites;

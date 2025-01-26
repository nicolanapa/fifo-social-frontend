import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import LoginContext from "../context/LoginContext";
import { getLoginObject } from "../scripts/getLoginObject";
import "../styles/posts.css";
import UserInfo from "./UserInfo";

function AddPost() {
    const { loginInfo, setLoginInfo } = useContext(LoginContext);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchLoginStatus() {
            setLoginInfo(await getLoginObject());
        }

        fetchLoginStatus();
    }, []);

    async function handlePost(e) {
        e.preventDefault();

        const isUserStillLoggedIn = await getLoginObject();
        setLoginInfo(isUserStillLoggedIn);

        if (isUserStillLoggedIn.isAuthenticated) {
            const response = await fetch(e.target.action, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                method: e.target.method,
                body: new URLSearchParams({
                    title: e.target.title.value,
                    content: e.target.content.value,
                }),
                credentials: "include",
            });

            const responseStatus = await response.json();

            if (responseStatus.success) {
                navigate("/");
            } else {
                navigate("/errorPage", {
                    state: {
                        code:
                            responseStatus.status !== ""
                                ? responseStatus.status
                                : "",
                        msg:
                            responseStatus.msg !== "" ? responseStatus.msg : "",
                    },
                });
            }
        }
    }

    return (
        <>
            {loginInfo.isAuthenticated ? (
                <article className="post-container">
                    <UserInfo
                        userId={loginInfo.id}
                        username={loginInfo.username}
                    />

                    <form
                        action={
                            import.meta.env.VITE_SERVER_FULL_DOMAIN + "/post"
                        }
                        method="POST"
                        onSubmit={handlePost}
                        className="add-post-form"
                    >
                        <div>
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                id="title"
                                className="styled-input"
                                name="title"
                                minLength={2}
                                maxLength={64}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="content">Content</label>
                            <textarea
                                type="text"
                                id="content"
                                className="styled-input"
                                name="content"
                                maxLength={2000}
                            />
                        </div>

                        <button type="submit" className="styled-button">
                            Post
                        </button>
                    </form>
                </article>
            ) : (
                <div>
                    <h1>You&apos;re not logged in</h1>
                    <Link to="/login">Login or Signup</Link>
                </div>
            )}
        </>
    );
}

export default AddPost;

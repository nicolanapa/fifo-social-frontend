import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import PropTypes from "prop-types";
import LoginContext from "../context/LoginContext";
import { getLoginObject } from "../scripts/getLoginObject";
import "../styles/posts.css";
import "../styles/forms.css";

function AddComment({ postId }) {
    const { loginInfo, setLoginInfo } = useContext(LoginContext);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchLoginStatus() {
            setLoginInfo(await getLoginObject());
        }

        fetchLoginStatus();
    }, []);

    async function handleComment(e) {
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
                    content: e.target.content.value,
                }),
                credentials: "include",
            });

            const responseStatus = await response.json();

            if (responseStatus.success) {
                window.location.reload();
            } else {
                navigate("/errorPage", {
                    state: {
                        code:
                            responseStatus.status !== ""
                                ? responseStatus.status
                                : "",
                        msg:
                            responseStatus.msg !== ""
                                ? responseStatus.msg
                                : "Couldn't POST the comment",
                    },
                });
            }
        }
    }

    return (
        <>
            {loginInfo.isAuthenticated ? (
                <form
                    action={
                        import.meta.env.VITE_SERVER_FULL_DOMAIN +
                        "/comment/" +
                        postId
                    }
                    method="POST"
                    onSubmit={handleComment}
                    className="add-comment-form"
                >
                    <label htmlFor="content">Leave a Comment</label>

                    <div className="info-submit-container">
                        <div className="user-info">
                            <img
                                className="small-image"
                                src="/icons/userIcon.svg"
                                alt="User"
                            />
                            <div className="username">
                                <Link to={"/user/" + loginInfo.id}>
                                    <address>{loginInfo.username}</address>
                                </Link>
                            </div>
                        </div>

                        <button type="submit" className="styled-button">
                            Submit
                        </button>
                    </div>

                    <textarea
                        type="text"
                        id="content"
                        name="content"
                        minLength={1}
                        maxLength={1000}
                        rows={3}
                        required
                    />
                </form>
            ) : (
                <div>
                    <h1>You&apos;re not logged in</h1>
                    <Link to="/login">Login or Signup to comment</Link>
                </div>
            )}
        </>
    );
}

AddComment.propTypes = {
    postId: PropTypes.number.isRequired,
};

export default AddComment;

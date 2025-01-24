import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Like from "./Like";
import More from "./More";
import "../styles/posts.css";
import UserInfo from "./UserInfo";

function Comment(props) {
    const { commentId, user_id, content, likes, creation_date } = props;
    const [user, setUser] = useState("");

    useEffect(() => {
        async function fetchLoginStatus() {
            const response = await fetch(
                import.meta.env.VITE_SERVER_DOMAIN +
                    ":" +
                    import.meta.env.VITE_SERVER_PORT +
                    "/user/" +
                    user_id,
                {
                    method: "GET",
                    credentials: "include",
                }
            );

            const responseObject = await response.json();
            setUser(responseObject[0].username);
        }

        fetchLoginStatus();
    }, []);

    return (
        <article className="comment-container">
            <UserInfo
                userId={user_id}
                username={user}
                creationDate={creation_date}
            />

            <p className="comment-content">{content}</p>

            <footer className="post-tools">
                <Like id={commentId} likes={likes} postOrComment={"comment"} />

                <More xId={commentId} typeOfX={"comment"} />
            </footer>
        </article>
    );
}

Comment.propTypes = {
    commentId: PropTypes.number.isRequired,
    user_id: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    likes: PropTypes.string,
    creation_date: PropTypes.string,
};

export default Comment;

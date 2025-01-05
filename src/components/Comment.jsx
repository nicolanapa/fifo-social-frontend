import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router";
import Like from "./Like";
import More from "./More";

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
        <article>
            <div>
                <Link to={"/user/" + user_id}>
                    <img src="/icons/userIcon.svg" alt="User" />
                    <address>{user}</address>
                </Link>
                <p>{creation_date}</p>
            </div>

            <p>{content}</p>

            <footer>
                <Like id={commentId} likes={likes} postOrComment={"comment"} />

                <button type="button">
                    {/* favorite this comment feature, TBD after favorite a post feature */}
                </button>

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

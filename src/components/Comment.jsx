import { useEffect, useState } from "react";
import PropTypes from "prop-types";

function Comment(props) {
    const { user_id, content, likes, creation_date } = props;
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
                <img src="/icons/userIcon.svg" alt="User" />
                <address>{user}</address>
                <p>{creation_date}</p>
            </div>

            <p>{content}</p>

            <footer>
                <button type="button">
                    <img src="/icons/thumbsUpIcon.svg" alt="Like this post" />
                    <p>{likes}</p>
                </button>
                <button type="button">
                    {/* favorite this comment feature, TBD after favorite a post feature */}
                </button>
            </footer>
        </article>
    );
}

Comment.propTypes = {
    user_id: PropTypes.number,
    content: PropTypes.string,
    likes: PropTypes.string,
    creation_date: PropTypes.string,
};

export default Comment;

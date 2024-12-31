import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router";

function PostPreview(props) {
    const { id, user_id, title, content, likes, creation_date } = props;
    const [username, setUsername] = useState("");

    useEffect(() => {
        async function fetchUsername() {
            const responseUser = await fetch(
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

            const responseUserObject = await responseUser.json();

            setUsername(responseUserObject[0].username);
        }

        fetchUsername();
    }, []);

    return (
        <article>
            <div>
                <img src="/icons/userIcon.svg" alt="User" />
                <div>
                    <address>{username}</address>
                    <p>{creation_date}</p>
                </div>
            </div>

            <h1>
                <Link to={"/post/" + id}>{title}</Link>
            </h1>
            <p>{content}</p>

            <footer>
                <button type="button">
                    <img src="/icons/thumbsUpIcon.svg" alt="Like this post" />
                    <p>{likes}</p>
                </button>
                <button type="button">
                    {/* favorite this post feature */}
                </button>
                {/*<div>
                    <p>{length}</p>
                    <img src="/icons/messageIcon.svg" alt="Comments" />
                </div>*/}
            </footer>
        </article>
    );
}

PostPreview.propTypes = {
    id: PropTypes.number.isRequired,
    user_id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string,
    likes: PropTypes.string.isRequired,
    creation_date: PropTypes.string.isRequired,
};

export default PostPreview;

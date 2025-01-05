import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router";
import Like from "./Like";
import More from "./More";

function PostPreview(props) {
    const { id, user_id, title, content, likes, creation_date } = props;
    const [username, setUsername] = useState("");
    const [commentsAmount, setCommentsAmount] = useState(0);

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

            const responseComments = await fetch(
                import.meta.env.VITE_SERVER_DOMAIN +
                    ":" +
                    import.meta.env.VITE_SERVER_PORT +
                    "/post/" +
                    id +
                    "/comments",
                {
                    method: "GET",
                    credentials: "include",
                }
            );

            const responseCommentsObject = await responseComments.json();

            setCommentsAmount(responseCommentsObject.length);
        }

        fetchUsername();
    }, []);

    return (
        <article>
            <div>
                <Link to={"/user/" + user_id}>
                    <img src="/icons/userIcon.svg" alt="User" />
                </Link>
                <div>
                    <Link to={"/user/" + user_id}>
                        <address>{username}</address>
                    </Link>
                    <p>{creation_date}</p>
                </div>
            </div>

            <h1>
                <Link to={"/post/" + id}>{title}</Link>
            </h1>
            <p>{content}</p>

            <footer>
                <Like id={id} likes={likes} postOrComment={"post"} />

                <button type="button">
                    {/* favorite this post feature */}
                </button>

                <div>
                    <p>{commentsAmount}</p>
                    <img src="/icons/messageIconFeather.svg" alt="Comments" />
                </div>

                <More xId={id} typeOfX={"post"} />
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

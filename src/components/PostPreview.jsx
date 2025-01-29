import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router";
import Like from "./Like";
import More from "./More";
import "../styles/posts.css";
import UserInfo from "./UserInfo";

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

            const responseUserObject = await responseUser.json();
            const responseCommentsObject = await responseComments.json();

            setUsername(responseUserObject[0].username);
            setCommentsAmount(responseCommentsObject.length);
        }

        fetchUsername();
    }, []);

    return (
        <article className="post-container">
            <UserInfo
                userId={user_id}
                username={username}
                creationDate={creation_date}
            />

            <div className="post-content">
                <h1>
                    <Link to={"/post/" + id}>{title}</Link>
                </h1>
                <p>{content}</p>
            </div>

            <footer className="post-tools">
                <Like id={id} likes={likes} postOrComment={"post"} />

                <div className="styled-button">
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

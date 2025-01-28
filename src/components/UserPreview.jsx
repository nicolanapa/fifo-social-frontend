import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router";
import FollowUser from "./FollowUser";
import "../styles/users.css";

function UserPreview(props) {
    const [postObject, setPostObject] = useState("");

    useEffect(() => {
        async function fetchUserAndPosts() {
            const responsePost = await fetch(
                import.meta.env.VITE_SERVER_DOMAIN +
                    ":" +
                    import.meta.env.VITE_SERVER_PORT +
                    "/user/" +
                    props.id +
                    "/posts",
                {
                    method: "GET",
                    credentials: "include",
                }
            );

            const responsePostObject = await responsePost.json();

            console.log(responsePostObject);
            setPostObject(responsePostObject);
        }

        fetchUserAndPosts();
    }, []);

    return (
        <div>
            <section>
                <Link to={"/user/" + props.id}>
                    <img src="/icons/userIcon.svg" alt="User" />
                </Link>
                <div>
                    <div>
                        <h1>
                            <Link to={"/user/" + props.id}>
                                {props.username}
                            </Link>
                        </h1>
                        <small>{props.id}</small>
                        {props.admin ? <p>ADMIN</p> : ""}
                        <p>
                            Created on the{" "}
                            {new Date(props.creation_date).toLocaleString()}
                        </p>
                    </div>
                    <p>
                        {props.description !== ""
                            ? props.description
                            : "No description yet!"}
                    </p>
                </div>
            </section>

            <section className="user-tools">
                <button className="followers-button">
                    <Link to={"/user/" + props.id + "/followers"}>
                        {props.followers} Followers
                    </Link>
                </button>
                <button className="followers-button">
                    <Link to={"/user/" + props.id + "/followed"}>
                        {props.followed} Followed
                    </Link>
                </button>
                <p>{postObject.length} posts</p>
                <FollowUser userId={props.id} />
            </section>
        </div>
    );
}

UserPreview.propTypes = {
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    admin: PropTypes.bool.isRequired,
    creation_date: PropTypes.string.isRequired,
    followers: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
    followed: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
};

export default UserPreview;

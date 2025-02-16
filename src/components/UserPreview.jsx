import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router";
import FollowUser from "./FollowUser";
import "../styles/users.css";
import UserInfo from "./UserInfo";

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

            setPostObject(responsePostObject);
        }

        fetchUserAndPosts();
    }, []);

    return (
        <div className="user-preview">
            <section>
                <UserInfo
                    userId={props.id}
                    username={props.username}
                    creationDate={props.creation_date}
                />

                <div className="other-user-info">
                    {props.admin ? (
                        <p className="bold">ADMIN</p>
                    ) : (
                        <p className="bold">USER</p>
                    )}{" "}
                    <p className="description">
                        {props.description !== ""
                            ? props.description
                            : "No description yet!"}
                    </p>
                </div>
            </section>

            <section className="user-tools">
                <div>
                    <Link to={"/user/" + props.id + "/followers"}>
                        <button className="followers-button">
                            {props.followers} Followers
                        </button>
                    </Link>
                    <Link to={"/user/" + props.id + "/followed"}>
                        <button className="followers-button">
                            {props.followed} Followed
                        </button>
                    </Link>
                </div>
                <div>
                    <Link
                        to={"/user/" + props.id + "/#posts"}
                        className="no-link-style"
                    >
                        <div className="styled-button">
                            <p>{postObject.length} Posts</p>
                        </div>
                    </Link>

                    <FollowUser userId={props.id} />
                </div>
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

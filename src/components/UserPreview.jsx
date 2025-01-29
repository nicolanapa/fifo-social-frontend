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

            console.log(responsePostObject);
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
                <div className="styled-button">
                    <p>{postObject.length} posts</p>
                </div>
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

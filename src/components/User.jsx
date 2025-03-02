import { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router";
import PostPreview from "./PostPreview";
import More from "./More";
import FollowUser from "./FollowUser";
import "../styles/users.css";
import UserInfo from "./UserInfo";

function User() {
    const { userId } = useParams();
    const [userObject, setUserObject] = useState("");
    const [postObject, setPostObject] = useState("");

    useEffect(() => {
        async function fetchUserAndPosts() {
            const responseUser = await fetch(
                import.meta.env.VITE_SERVER_DOMAIN +
                    ":" +
                    import.meta.env.VITE_SERVER_PORT +
                    "/user/" +
                    userId,
                {
                    method: "GET",
                    credentials: "include",
                }
            );

            const responseUserObject = await responseUser.json();

            const responsePost = await fetch(
                import.meta.env.VITE_SERVER_DOMAIN +
                    ":" +
                    import.meta.env.VITE_SERVER_PORT +
                    "/user/" +
                    userId +
                    "/posts",
                {
                    method: "GET",
                    credentials: "include",
                }
            );

            const responsePostObject = await responsePost.json();

            /* console.log(responseUserObject[0]);
            console.log(responsePostObject); */

            setUserObject(responseUserObject[0]);
            setPostObject(responsePostObject);
        }

        fetchUserAndPosts();
    }, [userId]);

    return (
        <div className="user-container">
            <Outlet />

            <section className="user-info-detailed">
                <UserInfo
                    userId={userObject.user_id}
                    username={userObject.username}
                    creationDate={userObject.account_creation_date}
                />

                <div className="other-user-info">
                    {userObject.admin ? (
                        <p className="bold">ADMIN</p>
                    ) : (
                        <p className="bold">USER</p>
                    )}{" "}
                    <p className="description">
                        {userObject.description !== ""
                            ? userObject.description
                            : "No description yet!"}
                    </p>
                </div>
            </section>

            <div className="user-tools">
                <div>
                    {/* Move the two buttons / .user-tools in another Component*/}
                    <Link to={"./followers"}>
                        <button className="followers-button">
                            {userObject.followers} Followers
                        </button>
                    </Link>
                    <Link to={"./followed"}>
                        {" "}
                        <button className="followers-button">
                            {userObject.followed} Followed
                        </button>
                    </Link>
                </div>
                <div>
                    <FollowUser userId={userId} />
                    <More xId={userId} typeOfX={"user"} />
                </div>
            </div>

            <section id="posts">
                {postObject.length !== 0 ? (
                    postObject.map((post) => {
                        const randomKey = crypto.randomUUID();

                        return (
                            <PostPreview
                                id={post.id}
                                user_id={post.user_id}
                                title={post.title}
                                content={post.content}
                                likes={post.likes}
                                creation_date={post.creation_date}
                                key={randomKey}
                            />
                        );
                    })
                ) : (
                    <h2 className="title-section">No posts yet...</h2>
                )}
            </section>
        </div>
    );
}

export default User;

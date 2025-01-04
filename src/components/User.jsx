import { useEffect, useState } from "react";
import { useParams } from "react-router";
import PostPreview from "./PostPreview";
import DeleteX from "./DeleteX";
import More from "./More";

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

            console.log(responseUserObject[0]);
            console.log(responsePostObject);
            setUserObject(responseUserObject[0]);
            setPostObject(responsePostObject);
        }

        fetchUserAndPosts();
    }, []);

    return (
        <div>
            <section>
                <img src="/icons/userIcon.svg" alt="User" />
                <div>
                    <div>
                        <h1>{userObject.username}</h1>
                        <small>{userObject.id}</small>
                        {userObject.admin ? <p>ADMIN</p> : ""}
                        <p>
                            Created on the{" "}
                            {new Date(
                                userObject.account_creation_date
                            ).toLocaleString()}
                        </p>
                    </div>
                    <p>
                        {userObject.description !== ""
                            ? userObject.description
                            : "No description yet!"}
                    </p>
                </div>
            </section>

            <More xId={userId} typeOfX={"user"} />

            <section>
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
                    <h2>No posts yet...</h2>
                )}
            </section>
        </div>
    );
}

export default User;

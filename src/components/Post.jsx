import { useEffect, useState } from "react";
import { useParams } from "react-router";

function Post() {
    const { postId } = useParams();
    const [postObject, setPostObject] = useState("");
    const [commentsObject, setCommentsObject] = useState("");

    useEffect(() => {
        async function fetchLoginStatus() {
            const responsePost = await fetch(
                import.meta.env.VITE_SERVER_DOMAIN +
                    ":" +
                    import.meta.env.VITE_SERVER_PORT +
                    "/post/" +
                    postId,
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
                    postId +
                    "/comments",
                {
                    method: "GET",
                    credentials: "include",
                }
            );

            const responsePostObject = await responsePost.json();
            const responseCommentsObject = await responseComments.json();

            console.log(responsePostObject[0]);
            setPostObject(responsePostObject[0]);
            console.log(responseCommentsObject);
            setCommentsObject(responseCommentsObject);
        }

        fetchLoginStatus();
    }, []);

    return (
        <article>
            <div>
                <img src="/icons/userIcon.svg" alt="User" />
                <address>{postObject.username}</address>
            </div>

            <h1>{postObject.title}</h1>
            <p>{postObject.content}</p>

            <footer>
                <button type="button">
                    <img src="/icons/thumbsUpIcon.svg" alt="Like this post" />
                    <p>{postObject.likes}</p>
                </button>
                <button type="button">
                    {/* favorite this post feature */}
                </button>
                <div>
                    <p>{commentsObject.length}</p>
                    <img src="/icons/messageIcon.svg" alt="Comments" />
                </div>
            </footer>

            <section>{/* iterate over all comments */}</section>
        </article>
    );
}

export default Post;

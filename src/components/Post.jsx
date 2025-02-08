import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Comment from "./Comment";
import AddComment from "./AddComment";
import Like from "./Like";
import More from "./More";
import "../styles/posts.css";
import UserInfo from "./UserInfo";

function Post() {
    const { postId } = useParams();
    const [postObject, setPostObject] = useState("");
    const [commentsObject, setCommentsObject] = useState("");

    useEffect(() => {
        async function fetchPostAndComments() {
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

            /* console.log(responsePostObject[0]);
            console.log(responseCommentsObject); */
            setCommentsObject(responseCommentsObject);

            const responseUser = await fetch(
                import.meta.env.VITE_SERVER_DOMAIN +
                    ":" +
                    import.meta.env.VITE_SERVER_PORT +
                    "/user/" +
                    responsePostObject[0].user_id,
                {
                    method: "GET",
                    credentials: "include",
                }
            );

            const responseUserObject = await responseUser.json();

            setPostObject({
                ...responsePostObject[0],
                username: responseUserObject[0].username,
            });
        }

        fetchPostAndComments();
    }, []);

    return (
        <article className="post-container">
            <UserInfo
                userId={postObject.user_id}
                username={postObject.username}
                creationDate={postObject.creation_date}
            />

            <div className="post-content">
                <h1>{postObject.title}</h1>
                <p>{postObject.content}</p>
            </div>

            <footer className="post-tools">
                {postObject && (
                    <Like
                        id={postId}
                        likes={postObject.likes}
                        postOrComment={"post"}
                    />
                )}

                <div className="styled-button">
                    <p>{commentsObject.length}</p>
                    <img className="small-image" src="/icons/messageIconFeather.svg" alt="Comments" />
                </div>

                <More xId={postId} typeOfX={"post"} />
            </footer>

            <AddComment postId={postId} />

            <section className="comments-section">
                {commentsObject.length !== 0 ? (
                    commentsObject.map((comment) => {
                        const randomKey = crypto.randomUUID();

                        return (
                            <Comment
                                commentId={comment.id}
                                user_id={comment.user_id}
                                content={comment.content}
                                likes={comment.likes}
                                creation_date={comment.creation_date}
                                key={randomKey}
                            />
                        );
                    })
                ) : (
                    <h2 className="title-section">No comments yet...</h2>
                )}
            </section>
        </article>
    );
}

export default Post;

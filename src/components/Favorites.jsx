import { useContext, useEffect, useState } from "react";
import LoginContext from "../context/LoginContext";
import { getLoginObject } from "../scripts/getLoginObject";
import { Link } from "react-router";
import PostPreview from "./PostPreview";
import Comment from "./Comment";

function Favorites() {
    const { loginInfo, setLoginInfo } = useContext(LoginContext);
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);
    const [randomKeyPosts, setRandomKeyPosts] = useState([]);
    const [randomKeyComments, setRandomKeyComments] = useState([]);

    async function fetchFavorites(id) {
        const responsePost = await fetch(
            import.meta.env.VITE_SERVER_DOMAIN +
                ":" +
                import.meta.env.VITE_SERVER_PORT +
                "/favorite/" +
                id +
                "/posts",
            {
                method: "GET",
                credentials: "include",
            }
        );

        const responseComment = await fetch(
            import.meta.env.VITE_SERVER_DOMAIN +
                ":" +
                import.meta.env.VITE_SERVER_PORT +
                "/favorite/" +
                id +
                "/comments",
            {
                method: "GET",
                credentials: "include",
            }
        );

        const responsePostObject = await responsePost.json();
        const responseCommentObject = await responseComment.json();

        const tempRandomKeysPosts = [];
        const tempRandomKeysComments = [];

        for (let i = 0; i < responsePostObject.length; i++) {
            tempRandomKeysPosts.push(crypto.randomUUID());
        }

        for (let i = 0; i < responseCommentObject.length; i++) {
            tempRandomKeysComments.push(crypto.randomUUID());
        }

        setRandomKeyPosts(tempRandomKeysPosts);
        setRandomKeyComments(tempRandomKeysComments);

        setPosts(await responsePostObject);
        setComments(await responseCommentObject);
    }

    useEffect(() => {
        async function fetchLoginStatus() {
            const updatedLoginInfo = await getLoginObject();
            setLoginInfo(updatedLoginInfo);

            if (updatedLoginInfo.isAuthenticated) {
                fetchFavorites(updatedLoginInfo.id);
            }
        }

        fetchLoginStatus();
    }, []);

    return (
        <>
            {loginInfo.isAuthenticated ? (
                <>
                    <section>
                        <h2 className="title-section">Posts</h2>

                        {posts.length !== 0 ? (
                            posts.map((post, i) => {
                                console.log("index", i, randomKeyPosts[i]);

                                return (
                                    <PostPreview
                                        id={post.id}
                                        user_id={post.user_id}
                                        title={post.title}
                                        content={post.content}
                                        likes={post.likes}
                                        creation_date={post.creation_date}
                                        key={randomKeyPosts[i]}
                                    />
                                );
                            })
                        ) : (
                            <h2>No Favorited posts yet...</h2>
                        )}
                    </section>
                    <section>
                        <h2 className="title-section">Comments</h2>

                        {comments.length !== 0 ? (
                            comments.map((comment, i) => {
                                console.log("index", i, randomKeyComments[i]);
                                return (
                                    <Comment
                                        commentId={comment.id}
                                        user_id={comment.user_id}
                                        content={comment.content}
                                        likes={comment.likes}
                                        creation_date={comment.creation_date}
                                        key={randomKeyComments[i]}
                                    />
                                );
                            })
                        ) : (
                            <h2>No Favorited comments yet...</h2>
                        )}
                    </section>
                </>
            ) : (
                <div>
                    <h1>You&apos;re not logged in</h1>
                    <Link to="/login">Login or Signup</Link>
                </div>
            )}
        </>
    );
}

export default Favorites;

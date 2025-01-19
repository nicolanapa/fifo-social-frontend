import { useContext, useEffect, useState } from "react";
import LoginContext from "../context/LoginContext";
import PostPreview from "./PostPreview";
import { getLoginObject } from "../scripts/getLoginObject";

function Home() {
    const { loginInfo, setLoginInfo } = useContext(LoginContext);
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [usersKey, setUsersKey] = useState([]);
    const [postsKey, setPostsKey] = useState([]);

    // Reduce to one single fetch function with parameters
    // If they're not used for anything other than fetching
    async function fetchX(typeOfX, userId = 1) {
        const response = await fetch(
            import.meta.env.VITE_SERVER_DOMAIN +
                ":" +
                import.meta.env.VITE_SERVER_PORT +
                "/user/" +
                (typeOfX === "users"
                    ? ""
                    : typeOfX === "followed"
                    ? userId + "/followed"
                    : typeOfX === "posts"
                    ? userId + "/posts"
                    : ""),
            {
                method: "GET",
                credentials: "include",
            }
        );

        const responseObject = await response.json();

        return responseObject;
    }

    async function fetchAuthenticated(userId) {
        let postsTemp = [];
        let postsKeyTemp = [];

        const followedUsers = await fetchX("followed", userId);

        for (let i = 0; i < followedUsers.length; i++) {
            if (i === 20) {
                break;
            }

            const allUserPosts = await fetchX(
                "posts",
                followedUsers[i].followed_id
            );

            if (allUserPosts.length === 0) continue;

            for (let i2 = 0; i2 < allUserPosts.length; i2++) {
                if (i2 === 10) {
                    break;
                }

                postsTemp.push(allUserPosts[i2]);
                postsKeyTemp.push(crypto.randomUUID());
            }
        }

        console.log(postsTemp);

        return { postsTemp, postsKeyTemp };
    }

    async function fetchNotAuthenticated(allUsers) {
        let postsTemp = [];
        let postsKeyTemp = [];

        for (let i = 0; i < allUsers.length; i++) {
            if (i === 20) {
                break;
            }

            const allUserPosts = await fetchX("posts", allUsers[i].id);

            if (allUserPosts.length === 0) continue;

            for (let i2 = 0; i2 < allUserPosts.length; i2++) {
                if (i2 === 5) {
                    break;
                }

                postsTemp.push(allUserPosts[i2]);
                postsKeyTemp.push(crypto.randomUUID());
            }
        }

        console.log(postsTemp);

        return { postsTemp, postsKeyTemp };
    }

    useEffect(() => {
        async function fetchEverything() {
            const allUsers = await fetchX("users");
            let usersTemp = [];
            let postsTemp = [];
            let usersKeyTemp = [];
            let postsKeyTemp = [];

            const updatedLoginInfo = await getLoginObject();

            setLoginInfo(updatedLoginInfo);

            if (updatedLoginInfo.isAuthenticated) {
                ({ postsTemp, postsKeyTemp } = await fetchAuthenticated(
                    updatedLoginInfo.id
                ));
            } else {
                ({ postsTemp, postsKeyTemp } = await fetchNotAuthenticated(
                    allUsers
                ));
            }

            setUsersKey(usersKeyTemp);
            setPostsKey(postsKeyTemp);
            setUsers(usersTemp);
            setPosts(postsTemp);
        }

        fetchEverything();
    }, []);

    return (
        <>
            <div>
                <h1>Home</h1>
                {loginInfo.isAuthenticated && (
                    <div>
                        <h2>Hi, {loginInfo.username}</h2>
                        <p>
                            Here&apos;s the latest posts from the people you
                            follow!
                        </p>
                    </div>
                )}
            </div>

            <section>
                <h2>Recommended People</h2>

                {/* random users, UserPreview*/}
            </section>

            <section>
                {/* random posts if not logged in / posts from followed user list if logged in*/}
                {posts &&
                    posts.map((post, i) => (
                        <PostPreview
                            id={post.id}
                            user_id={post.user_id}
                            title={post.title}
                            content={post.content}
                            likes={post.likes}
                            creation_date={post.creation_date}
                            key={postsKey[i]}
                        />
                    ))}
            </section>
        </>
    );
}

export default Home;

import { useContext, useEffect, useState } from "react";
import LoginContext from "../context/LoginContext";

function Home() {
    const { loginInfo, setLoginInfo } = useContext(LoginContext);
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [usersKey, setUsersKey] = useState([]);
    const [postsKey, setPostsKey] = useState([]);

    // Reduce to one single fetch function with parameters
    // If they're not used for anything other than fetching
    async function fetchUsers() {
        const response = await fetch(
            import.meta.env.VITE_SERVER_DOMAIN +
                ":" +
                import.meta.env.VITE_SERVER_PORT +
                "/user",
            {
                method: "GET",
                credentials: "include",
            }
        );

        const responseObject = await response.json();

        return responseObject;
    }

    async function fetchFollowed(userId) {
        const response = await fetch(
            import.meta.env.VITE_SERVER_DOMAIN +
                ":" +
                import.meta.env.VITE_SERVER_PORT +
                "/user/" +
                userId +
                "/followed",
            {
                method: "GET",
                credentials: "include",
            }
        );

        const responseObject = await response.json();

        return responseObject;
    }

    async function fetchPosts(userId) {
        const response = await fetch(
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

        const responseObject = await response.json();

        return responseObject;
    }

    useEffect(() => {
        async function fetchEverything() {
            const allUsers = await fetchUsers();
            let usersTemp = [];
            let postsTemp = [];
            let usersKeyTemp = [];
            let postsKeyTemp = [];

            if (loginInfo.isAuthenticated) {
                const followedUsers = await fetchFollowed(loginInfo.id);
                console.log(followedUsers);
                console.log(await fetchFollowed(1));

                for (let i = 0; i < followedUsers.length; i++) {
                    if (i === 20) {
                        break;
                    }

                    const allUserPosts = await fetchPosts(
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
            }
        }

        fetchEverything();
    }, [loginInfo]);

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
            </section>
        </>
    );
}

export default Home;

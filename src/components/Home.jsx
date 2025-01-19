import { useContext, useEffect, useState } from "react";
import LoginContext from "../context/LoginContext";

function Home() {
    const { loginInfo, setLoginInfo } = useContext(LoginContext);
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);

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

            if (loginInfo.isAuthenticated) {
                const followedUsers = await fetchFollowed(loginInfo.id);
                console.log(followedUsers);
                console.log(await fetchFollowed(1));
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

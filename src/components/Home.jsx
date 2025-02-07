import { useContext, useEffect, useState } from "react";
import LoginContext from "../context/LoginContext";
import PostPreview from "./PostPreview";
import { getLoginObject } from "../scripts/getLoginObject";
import UserPreview from "./UserPreview";

function Home() {
    const { loginInfo, setLoginInfo } = useContext(LoginContext);
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [usersKey, setUsersKey] = useState([]);
    const [postsKey, setPostsKey] = useState([]);

    async function fetchX(typeOfX, userId = 1) {
        const response = await fetch(
            import.meta.env.VITE_SERVER_DOMAIN +
                ":" +
                import.meta.env.VITE_SERVER_PORT +
                "/user/" +
                (typeOfX === "users"
                    ? ""
                    : typeOfX === "user"
                    ? userId
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

    async function fetchAuthenticated(userId, allUsers) {
        let usersTemp = [];
        let usersKeyTemp = [];
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

        let randomNumbers = [];
        for (let i = 0; i < allUsers.length; i++) {
            if (i === 4) {
                break;
            }

            let i2 = 0;
            let newNumber = Math.floor(Math.random() * allUsers.length);
            while (randomNumbers.includes(newNumber) && i2 < 10) {
                newNumber = Math.floor(Math.random() * allUsers.length);

                i2++;
            }

            const followedUserId = allUsers[newNumber].id;
            const isAlreadyFollowed = followedUsers.some(
                (user) => user.followed_id === followedUserId
            );

            if (
                !randomNumbers.includes(newNumber) &&
                !isAlreadyFollowed &&
                allUsers[newNumber].id !== userId
            ) {
                randomNumbers.push(newNumber);

                const user = await fetchX("user", allUsers[newNumber].id);

                usersTemp.push(user[0]);
                usersKeyTemp.push(crypto.randomUUID());
            }
        }

        return { postsTemp, postsKeyTemp, usersTemp, usersKeyTemp };
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
                ({ postsTemp, postsKeyTemp, usersTemp, usersKeyTemp } =
                    await fetchAuthenticated(updatedLoginInfo.id, allUsers));
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
                <h1 className="title-section">Home</h1>
                {loginInfo.isAuthenticated && (
                    <div className="home-greet">
                        <h2>Hi, {loginInfo.username}</h2>
                        <p>
                            Here&apos;s the latest posts from the people you
                            follow!
                        </p>
                    </div>
                )}
            </div>

            {loginInfo.isAuthenticated && (
                <section>
                    {users.length >= 1 ? (
                        <h2 className="title-section">Recommended People</h2>
                    ) : (
                        ""
                    )}

                    {users &&
                        users.map((user, i) => (
                            <UserPreview
                                id={user.id}
                                username={user.username}
                                description={user.description}
                                admin={user.admin}
                                creation_date={user.account_creation_date}
                                followers={user.followers}
                                followed={user.followed}
                                key={usersKey[i]}
                            />
                        ))}
                </section>
            )}

            <section>
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

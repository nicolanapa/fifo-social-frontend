import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import PostPreview from "./PostPreview";
import UserPreview from "./UserPreview";

function AllUsersOrPosts() {
    const [allX, setAllX] = useState([]);
    const location = useLocation();

    useEffect(() => {
        async function fetchAll() {
            const response = await fetch(
                import.meta.env.VITE_SERVER_DOMAIN +
                    ":" +
                    import.meta.env.VITE_SERVER_PORT +
                    location.pathname,
                {
                    method: "GET",
                    credentials: "include",
                }
            );

            const responseObject = await response.json();

            console.log(responseObject);
            console.log(responseObject);
            setAllX(responseObject);
        }

        fetchAll();
    }, []);

    return (
        <>
            {location.pathname.includes("user") ? (
                allX.length !== 0 ? (
                    allX.map((user) => {
                        const randomKey = crypto.randomUUID();

                        return (
                            <UserPreview
                                id={user.id}
                                username={user.username}
                                description={user.description}
                                admin={user.admin}
                                creation_date={user.account_creation_date}
                                key={randomKey}
                            />
                        );
                    })
                ) : (
                    <h2>No users yet...</h2>
                )
            ) : allX.length !== 0 ? (
                allX.map((post) => {
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
        </>
    );
}

export default AllUsersOrPosts;

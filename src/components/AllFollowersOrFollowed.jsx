import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import UserPreview from "./UserPreview";

function AllFollowersOrFollowed() {
    const [allUsers, setAllUsers] = useState([]);
    const [randomKey, setRandomKey] = useState([]);
    const location = useLocation();

    async function fetchAllUsers(arrayOfUsers) {
        let tempAllUsers = [];
        let tempRandomKey = [];

        for (let i = 0; i < arrayOfUsers.length; i++) {
            let responseUser = {};

            if (location.pathname.includes("followers")) {
                responseUser = await fetch(
                    import.meta.env.VITE_SERVER_DOMAIN +
                        ":" +
                        import.meta.env.VITE_SERVER_PORT +
                        "/user/" +
                        arrayOfUsers[i].user_id,
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );
            } else if (location.pathname.includes("followed")) {
                responseUser = await fetch(
                    import.meta.env.VITE_SERVER_DOMAIN +
                        ":" +
                        import.meta.env.VITE_SERVER_PORT +
                        "/user/" +
                        arrayOfUsers[i].followed_id,
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );
            }

            const responseUserObject = await responseUser.json();

            tempRandomKey.push(crypto.randomUUID());
            tempAllUsers.push(responseUserObject[0]);
        }

        setRandomKey(tempRandomKey);
        setAllUsers(tempAllUsers);
    }

    useEffect(() => {
        async function fetchInfo() {
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

            console.log(responseObject, location.pathname);

            await fetchAllUsers(responseObject);
        }

        fetchInfo();
    }, [location.pathname]);

    return (
        <>
            {allUsers.length !== 0 ? (
                allUsers.map((user, i) => {
                    return (
                        <UserPreview
                            id={user.id}
                            username={user.username}
                            description={user.description}
                            admin={user.admin}
                            creation_date={user.account_creation_date}
                            key={randomKey[i]}
                        />
                    );
                })
            ) : (
                <p>
                    {location.pathname.includes("followers")
                        ? "No one is currently following User"
                        : "User is currently following no one"}
                </p>
            )}
        </>
    );
}

export default AllFollowersOrFollowed;

import { useLocation } from "react-router";
import UserPreview from "./UserPreview";
import PostPreview from "./PostPreview";

function SearchResult() {
    const location = useLocation();
    const state = location.state || {};

    const { array = [] } = state;
    let { typeOfSearch = "" } = state;

    if (
        (array.length === 0 && typeOfSearch !== "") ||
        (array.length === 2 &&
            array[0].length === 0 &&
            array[1].length === 0 &&
            typeOfSearch === "global")
    ) {
        typeOfSearch = "empty";
    }

    console.log(array.length);

    return (
        <>
            {typeOfSearch === "empty" ? (
                <p className="empty-search">No results found!</p>
            ) : typeOfSearch === "global" ? (
                <>
                    <p>Global</p>
                    <h2>Users Found</h2>
                    {array[0].length === 0 ? (
                        <p className="empty-search">
                            No User has been found...
                        </p>
                    ) : (
                        array[0].map((user) => {
                            const randomKey = crypto.randomUUID();

                            return (
                                <UserPreview
                                    id={user.id}
                                    username={user.username}
                                    description={user.description}
                                    admin={user.admin}
                                    creation_date={user.account_creation_date}
                                    followers={user.followers}
                                    followed={user.followed}
                                    key={randomKey}
                                />
                            );
                        })
                    )}

                    <h2>Posts Found</h2>
                    {array[1].length === 0 ? (
                        <p className="empty-search">
                            No Post has been found...
                        </p>
                    ) : (
                        array[1].map((post) => {
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
                    )}
                </>
            ) : typeOfSearch === "users" ? (
                <>
                    <h2>Users Found</h2>
                    {array.map((user) => {
                        const randomKey = crypto.randomUUID();

                        return (
                            <UserPreview
                                id={user.id}
                                username={user.username}
                                description={user.description}
                                admin={user.admin}
                                creation_date={user.account_creation_date}
                                followers={user.followers}
                                followed={user.followed}
                                key={randomKey}
                            />
                        );
                    })}
                </>
            ) : typeOfSearch === "posts" ? (
                <>
                    <h2>Posts Found</h2>
                    {array.map((post) => {
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
                    })}
                </>
            ) : (
                <p>Search something first!</p>
            )}
        </>
    );
}

export default SearchResult;

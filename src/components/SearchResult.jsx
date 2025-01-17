import { useLocation } from "react-router";

function SearchResult() {
    const location = useLocation();
    const state = location.state || {};

    const { array = [] } = state;
    let { typeOfSearch = "" } = state;

    if (array.length === 0 && typeOfSearch !== "") {
        typeOfSearch = "empty";
    }

    console.log(array.length);

    return (
        <>
            {typeOfSearch === "empty" ? (
                <p>No results found!</p>
            ) : typeOfSearch === "global" ? (
                <p>Global</p>
            ) : typeOfSearch === "users" ? (
                <p>User</p>
            ) : typeOfSearch === "posts" ? (
                <p>Post</p>
            ) : (
                <p>Search something first!</p>
            )}
        </>
    );
}

export default SearchResult;

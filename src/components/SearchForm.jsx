import { useState } from "react";
import { useNavigate } from "react-router";

function SearchForm() {
    const [selectedOption, setSelectedOption] = useState("global");
    const [hiddenSelect, setHiddenSelect] = useState(true);
    const navigate = useNavigate();

    async function handleSearching(e) {
        e.preventDefault();

        console.log(e.target.searchInput.value);

        const response = await fetch(
            e.target.action +
                "/?" +
                selectedOption +
                "=" +
                e.target.searchInput.value,
            {
                method: "GET",
                credentials: "include",
            }
        );

        const responseObject = await response.json();

        console.log(responseObject);

        navigate("/search", {
            state: { array: responseObject, typeOfSearch: selectedOption },
        });
    }

    return (
        <form
            action={import.meta.env.VITE_SERVER_FULL_DOMAIN + "/search"}
            method="GET"
            onSubmit={handleSearching}
        >
            <input type="search" name="searchInput" id="search-input" />

            <button
                type="button"
                onClick={() => {
                    setHiddenSelect(!hiddenSelect);
                }}
            >
                <img src="/icons/searchTypeIcon.svg" alt="Search options" />
            </button>

            <div>
                <label htmlFor="type-of-search" hidden={hiddenSelect}>
                    Search by
                </label>
                <select
                    name="typeOfSearch"
                    id="type-of-search"
                    value={selectedOption}
                    onChange={(e) => setSelectedOption(e.target.value)}
                    hidden={hiddenSelect}
                >
                    <option value="global">All</option>
                    <option value="users">Users</option>
                    <option value="posts">Posts</option>
                </select>
            </div>
            {/*selectedOption === "global" ? (
                <img src="/icons/userIcon.svg" alt="Global Search" />
            ) : selectedOption === "users" ? (
                <img src="/icons/userIcon.svg" alt="Search only Users" />
            ) : (
                "Post"
            )*/}
            <button type="submit">
                <img src="/icons/searchIcon.svg" alt="Search" />
            </button>
        </form>
    );
}

export default SearchForm;

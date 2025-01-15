import { useState } from "react";

function SearchForm() {
    const [selectedOption, setSelectedOption] = useState("global");
    const [hiddenSelect, setHiddenSelect] = useState(true);

    async function handleSearching(e) {
        e.preventDefault();
    }

    return (
        <form
            action={import.meta.env.VITE_SERVER_FULL_DOMAIN + "/search"}
            method="GET"
            onSubmit={handleSearching}
        >
            <input
                type="search"
                onClick={() => {
                    setHiddenSelect(!hiddenSelect);
                }}
            />

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

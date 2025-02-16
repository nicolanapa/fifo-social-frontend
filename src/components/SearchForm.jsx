import { useState } from "react";
import { useNavigate } from "react-router";
import PropTypes from "prop-types";
import "../styles/navBar.css";

function SearchForm({ width }) {
    const [selectedOption, setSelectedOption] = useState("global");
    const [hiddenSelect, setHiddenSelect] = useState(true);
    const [isOpenSmallModal, setIsOpenSmallModal] = useState(false);
    const navigate = useNavigate();

    async function handleSearching(e) {
        e.preventDefault();

        setHiddenSelect(true);
        setIsOpenSmallModal(false);

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

        navigate("/search", {
            state: { array: responseObject, typeOfSearch: selectedOption },
        });
    }

    return (
        <>
            {width <= 500 ? (
                <button
                    type="submit"
                    onClick={() => {
                        setIsOpenSmallModal(!isOpenSmallModal);
                    }}
                    className="styled-button"
                >
                    <img
                        className={
                            (width <= 800 ? "small" : "bigger") + "-image"
                        }
                        src="/icons/searchIcon.svg"
                        alt="Search"
                    />
                </button>
            ) : (
                ""
            )}

            {width > 500 || isOpenSmallModal ? (
                <form
                    action={import.meta.env.VITE_SERVER_FULL_DOMAIN + "/search"}
                    method="GET"
                    onSubmit={handleSearching}
                    className={
                        "search-form" +
                        (isOpenSmallModal && width <= 500
                            ? " absolute-search-form"
                            : "")
                    }
                >
                    <input
                        type="search"
                        name="searchInput"
                        id="search-input"
                        required
                    />

                    <button
                        type="button"
                        onClick={() => {
                            setHiddenSelect(!hiddenSelect);
                        }}
                        className="styled-button"
                    >
                        <img
                            className={
                                (width <= 800 ? "small" : "bigger") + "-image"
                            }
                            src="/icons/searchTypeIcon.svg"
                            alt="Search options"
                        />
                    </button>

                    <div
                        className={
                            "relative-modal" + (hiddenSelect ? " hidden" : "")
                        }
                    >
                        <div className="absolute-search-modal">
                            <label
                                htmlFor="type-of-search"
                                hidden={hiddenSelect}
                            >
                                Search by
                            </label>
                            <select
                                name="typeOfSearch"
                                id="type-of-search"
                                value={selectedOption}
                                onChange={(e) =>
                                    setSelectedOption(e.target.value)
                                }
                                hidden={hiddenSelect}
                            >
                                <option value="global">All</option>
                                <option value="users">Users</option>
                                <option value="posts">Posts</option>
                            </select>
                        </div>
                    </div>

                    <button type="submit" className="styled-button">
                        <img
                            className={
                                (width <= 800 ? "small" : "bigger") + "-image"
                            }
                            src="/icons/searchIcon.svg"
                            alt="Search"
                        />
                    </button>
                </form>
            ) : (
                ""
            )}
        </>
    );
}

SearchForm.propTypes = {
    width: PropTypes.number,
};

export default SearchForm;

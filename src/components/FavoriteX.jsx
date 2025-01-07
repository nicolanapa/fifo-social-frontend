import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import LoginContext from "../context/LoginContext";
import { getLoginObject } from "../scripts/getLoginObject";
import { useNavigate } from "react-router";

function FavoriteX({ xId, typeOfX }) {
    const { loginInfo, setLoginInfo } = useContext(LoginContext);
    const [alreadyFavorited, setAlreadyFavorited] = useState(false);
    const navigate = useNavigate();

    async function favoriteThing() {
        const updatedLoginInfo = await getLoginObject();

        setLoginInfo(updatedLoginInfo);

        if (updatedLoginInfo.isAuthenticated) {
            const response = await fetch(
                import.meta.env.VITE_SERVER_DOMAIN +
                    ":" +
                    import.meta.env.VITE_SERVER_PORT +
                    "/favorite/" +
                    xId +
                    "/" +
                    typeOfX,
                {
                    method: "POST",
                    credentials: "include",
                }
            );

            const responseStatus = await response.json();

            console.log(responseStatus);

            if (responseStatus.success) {
                if (
                    responseStatus.msg ===
                    "Favorite has been added to " + typeOfX
                ) {
                    setAlreadyFavorited(true);
                } else if (
                    responseStatus.msg ===
                    "Favorite has been removed from " + typeOfX
                ) {
                    setAlreadyFavorited(false);
                }
            } else {
                navigate("/errorPage", {
                    state: {
                        code:
                            responseStatus.status !== ""
                                ? responseStatus.status
                                : "",
                        msg:
                            responseStatus.msg !== ""
                                ? responseStatus.msg
                                : "Couldn't favorite the " + typeOfX,
                    },
                });
            }
        }
    }

    async function checkFavoriteStatus() {
        const updatedLoginInfo = await getLoginObject();

        setLoginInfo(updatedLoginInfo);

        if (updatedLoginInfo.isAuthenticated) {
            const response = await fetch(
                import.meta.env.VITE_SERVER_DOMAIN +
                    ":" +
                    import.meta.env.VITE_SERVER_PORT +
                    "/favorite/" +
                    updatedLoginInfo.id +
                    "/" +
                    typeOfX +
                    "s",
                {
                    method: "GET",
                    credentials: "include",
                }
            );

            const responseStatus = await response.json();

            console.log(responseStatus);

            return responseStatus.some(
                (favorite) => favorite.id === Number(xId)
            );
        }
    }

    useEffect(() => {
        async function fetch() {
            setAlreadyFavorited(await checkFavoriteStatus());
        }

        fetch();
    }, [alreadyFavorited]);

    return (
        <>
            <button
                onClick={favoriteThing}
                disabled={!loginInfo.isAuthenticated}
            >
                <img
                    src={
                        "/icons/" +
                        (alreadyFavorited ? "remove" : "add") +
                        "FavoriteIcon.svg"
                    }
                    alt={
                        alreadyFavorited
                            ? "Unfavorite"
                            : "Favorite" + " this " + typeOfX
                    }
                />
            </button>
        </>
    );
}

FavoriteX.propTypes = {
    xId: PropTypes.number.isRequired,
    typeOfX: PropTypes.oneOf(["post", "comment"]).isRequired,
};

export default FavoriteX;

import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import LoginContext from "../context/LoginContext";

function DeleteX({ xId, typeOfX }) {
    const { loginInfo, setLoginInfo } = useContext(LoginContext);
    const [isOwner, setIsOwner] = useState(false);

    useEffect(() => {
        async function fetchX() {
            const response = await fetch(
                import.meta.env.VITE_SERVER_DOMAIN +
                    ":" +
                    import.meta.env.VITE_SERVER_PORT +
                    "/" +
                    typeOfX +
                    "/" +
                    xId,
                {
                    method: "GET",
                    credentials: "include",
                }
            );

            const responseObject = await response.json();

            if (typeOfX === "user") {
                setIsOwner(loginInfo.id === responseObject.id ? true : false);
            } else {
                setIsOwner(
                    loginInfo.id === responseObject[0].user_id ? true : false
                );
            }
        }

        fetchX();
    }, []);

    return (
        <>
            {isOwner && (
                <button>
                    <img
                        src="/icons/deleteIconFeather.svg"
                        alt={"Delete this " + typeOfX}
                    />
                </button>
            )}
        </>
    );
}

DeleteX.propTypes = {
    xId: PropTypes.number.isRequired,
    typeOfX: PropTypes.oneOf(["user", "post", "comment"]).isRequired,
};

export default DeleteX;

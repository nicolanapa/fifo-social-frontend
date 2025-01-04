import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import LoginContext from "../context/LoginContext";
import { getLoginObject } from "../scripts/getLoginObject";
import { useNavigate } from "react-router";

function EditX({ xId, typeOfX }) {
    const { loginInfo, setLoginInfo } = useContext(LoginContext);
    const [isOwner, setIsOwner] = useState(false);
    const navigate = useNavigate();

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
                console.log(responseObject[0]);
                setIsOwner(
                    loginInfo.id === responseObject[0].user_id ? true : false
                );
            }
        }

        fetchX();
    }, []);

    async function editThing() {
        const updatedLoginInfo = await getLoginObject();

        setLoginInfo(updatedLoginInfo);

        if (updatedLoginInfo.isAuthenticated) {
            const deleteResponse = await fetch(
                import.meta.env.VITE_SERVER_DOMAIN +
                    ":" +
                    import.meta.env.VITE_SERVER_PORT +
                    "/" +
                    typeOfX +
                    "/" +
                    xId,
                {
                    method: "PATCH",
                    credentials: "include",
                }
            );

            const responseStatus = await deleteResponse.json();

            console.log(responseStatus);

            if (responseStatus.success) {
                location.reload();
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
                                : "Couldn't edit the " + typeOfX,
                    },
                });
            }
        }
    }

    return (
        <>
            <button onClick={editThing} disabled={!isOwner}>
                <img
                    src="/icons/editIconFeather.svg"
                    alt={"Edit this " + typeOfX}
                />
            </button>
        </>
    );
}

EditX.propTypes = {
    xId: PropTypes.number.isRequired,
    typeOfX: PropTypes.oneOf(["user", "post", "comment"]).isRequired,
};

export default EditX;

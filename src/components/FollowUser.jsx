import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import LoginContext from "../context/LoginContext";
import { getLoginObject } from "../scripts/getLoginObject";
import { useNavigate } from "react-router";

function FollowUser({ userId }) {
    const { loginInfo, setLoginInfo } = useContext(LoginContext);
    const [alreadyFollowing, setAlreadyFollowing] = useState(false);
    const navigate = useNavigate();

    async function checkFollowingStatus() {
        const updatedLoginInfo = await getLoginObject();

        setLoginInfo(updatedLoginInfo);

        if (updatedLoginInfo.isAuthenticated) {
            if (updatedLoginInfo.id === Number(userId)) {
                return false;
            }

            const checkingResponse = await fetch(
                import.meta.env.VITE_SERVER_DOMAIN +
                    ":" +
                    import.meta.env.VITE_SERVER_PORT +
                    "/follow/" +
                    userId,
                {
                    method: "GET",
                    credentials: "include",
                }
            );

            const checkingResponseObject = await checkingResponse.json();

            if (checkingResponseObject.success) {
                return checkingResponseObject.isFollowing;
            }

            return false;
        }
    }

    async function followThing() {
        if (loginInfo.isAuthenticated === false) {
            return navigate("/login");
        }

        const response = await fetch(
            import.meta.env.VITE_SERVER_DOMAIN +
                ":" +
                import.meta.env.VITE_SERVER_PORT +
                "/follow/" +
                userId,
            {
                method: alreadyFollowing ? "DELETE" : "PUT",
                credentials: "include",
            }
        );

        console.log(response);

        if (alreadyFollowing) {
            if (response.status === 204) {
                return setAlreadyFollowing(false);
            }
        } else {
            if (response.status === 201 || response.status === 204) {
                return setAlreadyFollowing(true);
            }
        }

        const responseStatus = response.json();

        if (responseStatus.success === false)
            navigate("/errorPage", {
                state: {
                    code:
                        responseStatus.status !== ""
                            ? responseStatus.status
                            : "",
                    msg:
                        responseStatus.msg !== ""
                            ? responseStatus.msg
                            : "Couldn't " +
                              (alreadyFollowing ? "un" : "") +
                              "follow the User",
                },
            });
    }

    useEffect(() => {
        async function fetch() {
            setAlreadyFollowing(await checkFollowingStatus());
        }

        fetch();
    }, []);

    return (
        <>
            {loginInfo.id !== Number(userId) && (
                <button
                    onClick={followThing}
                    disabled={!loginInfo.isAuthenticated}
                    className="styled-button"
                >
                    <img
                        src={
                            "/icons/" +
                            (alreadyFollowing ? "remove" : "add") +
                            "FollowIcon.svg"
                        }
                        alt={
                            alreadyFollowing
                                ? "Unfollow this User"
                                : "Follow this User"
                        }
                    />
                </button>
            )}
        </>
    );
}

FollowUser.propTypes = {
    userId: PropTypes.number.isRequired,
};

export default FollowUser;

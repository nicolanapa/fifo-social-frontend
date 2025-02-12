import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import LoginContext from "../context/LoginContext";

function Like({ id, likes, postOrComment }) {
    const { loginInfo } = useContext(LoginContext);
    const [likeAmount, setLikeAmount] = useState(Number(likes));
    const navigate = useNavigate();

    function updateLikeCount(amount) {
        setLikeAmount(likeAmount + amount);
    }

    async function likeX() {
        const response = await fetch(
            import.meta.env.VITE_SERVER_DOMAIN +
                ":" +
                import.meta.env.VITE_SERVER_PORT +
                "/" +
                postOrComment +
                "/" +
                id +
                "/like",
            {
                method: "POST",
                credentials: "include",
            }
        );

        const responseStatus = await response.json();

        if (responseStatus.success) {
            if (responseStatus.msg === "Like has been added") {
                updateLikeCount(1);
            } else if (responseStatus.msg === "Like has been removed") {
                updateLikeCount(-1);
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
                            : "An Error happened while trying to LIKE the " +
                              postOrComment,
                },
            });
        }
    }

    return (
        <button
            type="button"
            onClick={likeX}
            disabled={!loginInfo.isAuthenticated}
            className="styled-button"
        >
            <img
                className="small-image"
                src="/icons/thumbsUpIconFeather.svg"
                alt={"Like this " + postOrComment}
            />
            <p>{likeAmount}</p>
        </button>
    );
}

Like.propTypes = {
    id: PropTypes.number.isRequired,
    likes: PropTypes.string,
    postOrComment: PropTypes.oneOf(["post", "comment"]).isRequired,
};

export default Like;

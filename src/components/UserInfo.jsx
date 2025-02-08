import PropTypes from "prop-types";
import { Link } from "react-router";

function UserInfo({ userId, username, creationDate }) {
    userId = userId ? userId : 1;

    return (
        <div className="user-info">
            <Link to={"/user/" + userId}>
                <img
                    className="bigger-image"
                    src="/icons/userIcon.svg"
                    alt="User"
                />
            </Link>
            <div className="username">
                <Link to={"/user/" + userId}>
                    <address>{username ? username : "user"}</address>
                </Link>
                <p>
                    {creationDate
                        ? new Date(creationDate).toLocaleString()
                        : ""}
                </p>
            </div>
        </div>
    );
}

UserInfo.propTypes = {
    userId: PropTypes.number,
    username: PropTypes.string.isRequired,
    creationDate: PropTypes.string,
};

export default UserInfo;

import { Link } from "react-router";

function NotLoggedIn() {
    return (
        <div>
            <h1 className="title-section">You&apos;re not logged in</h1>
            <p className="title-section">
                <Link to="/login">Login or Signup</Link>
            </p>
        </div>
    );
}

export default NotLoggedIn;

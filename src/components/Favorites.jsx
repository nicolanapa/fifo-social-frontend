import { useContext, useEffect } from "react";
import LoginContext from "../context/LoginContext";
import { getLoginObject } from "../scripts/getLoginObject";
import { Link } from "react-router";

function Favorites() {
    const { loginInfo, setLoginInfo } = useContext(LoginContext);

    useEffect(() => {
        async function fetchLoginStatus() {
            setLoginInfo(await getLoginObject());
        }

        fetchLoginStatus();
    }, []);

    return (
        <>
            {loginInfo.isAuthenticated ? (
                <></>
            ) : (
                <div>
                    <h1>You&apos;re not logged in</h1>
                    <Link to="/login">Login or Signup</Link>
                </div>
            )}
        </>
    );
}

export default Favorites;

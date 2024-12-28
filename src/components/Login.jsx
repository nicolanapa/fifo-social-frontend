import { useState, useEffect } from "react";
import { getLoginStatus } from "../scripts/getLoginStatus.js";

function Login() {
    const [loginStatus, setLoginStatus] = useState(false);

    useEffect(() => {
        async function fetchLoginStatus() {
            setLoginStatus(await getLoginStatus());
        }

        fetchLoginStatus();
    }, []);

    return (
        <>
            <div>
                {loginStatus ? (
                    <>
                        <p>
                            You&apos;re already logged in but you can still
                            login in another account or create another!
                        </p>
                    </>
                ) : (
                    <>
                        <p>
                            You aren&apos;t logged in. You can Login or Signup!
                        </p>
                    </>
                )}
                <h2>Login</h2>

                <form action="/login" method="POST"></form>
            </div>
            <div>
                <h2>Signup</h2>

                <form action="/user" method="POST"></form>
            </div>
        </>
    );
}

export default Login;

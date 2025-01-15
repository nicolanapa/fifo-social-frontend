import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import LoginContext from "../context/LoginContext.jsx";

function Login() {
    const { loginInfo, setLoginInfo } = useContext(LoginContext);
    const [newUser, setNewUser] = useState({ username: "", password: "" });
    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();

        const response = await fetch(e.target.action, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            method: e.target.method,
            body: new URLSearchParams({
                username: e.target.username.value,
                password: e.target.password.value,
            }),
            credentials: "include",
        });

        const responseStatus = await response.json();

        console.log(responseStatus);

        if (responseStatus.isAuthenticated) {
            setLoginInfo(responseStatus);
            navigate("../", 200);
        }
    }

    async function handleSignup(e) {
        e.preventDefault();

        const response = await fetch(e.target.action, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            method: e.target.method,
            body: new URLSearchParams({
                username: e.target.username.value,
                description: e.target.description.value,
            }),
            credentials: "include",
        });

        const responseStatus = await response.json();

        console.log(responseStatus);

        setNewUser({
            username: e.target.username.value,
            password: responseStatus.password,
        });
    }

    return (
        <>
            <div>
                {loginInfo.isAuthenticated ? (
                    <>
                        <p>
                            You&apos;re already logged in as{" "}
                            {loginInfo.username} but you can still log in as
                            another account or create a new one!
                        </p>
                    </>
                ) : (
                    <>
                        <p>
                            You aren&apos;t logged in. You should Login or
                            Signup!
                        </p>
                    </>
                )}
                <h2>Login</h2>

                <form
                    action={import.meta.env.VITE_SERVER_FULL_DOMAIN + "/login"}
                    method="POST"
                    onSubmit={handleLogin}
                >
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        minLength={2}
                        maxLength={64}
                        required
                    />

                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        required
                    />

                    <button type="submit">Enter</button>
                </form>
            </div>
            <div>
                <h2>Signup</h2>

                <form
                    action={import.meta.env.VITE_SERVER_FULL_DOMAIN + "/user"}
                    method="POST"
                    onSubmit={handleSignup}
                >
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        minLength={2}
                        maxLength={64}
                        required
                    />

                    <label htmlFor="description">Description</label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        maxLength={150}
                    />

                    <button type="submit">Register</button>
                </form>

                {newUser.username !== "" && newUser.password !== "" ? (
                    <div>
                        <h2>Your new account was successfully created!</h2>
                        <p>Username: {newUser.username}</p>
                        <p>Password: {newUser.password}</p>
                        <p>You can now log in!</p>
                    </div>
                ) : (
                    ""
                )}
            </div>
        </>
    );
}

export default Login;

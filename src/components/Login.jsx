import { useState, useEffect } from "react";
import { getLoginStatus } from "../scripts/getLoginStatus.js";

function Login() {
    const [loginStatus, setLoginStatus] = useState(false);
    const [form, setForm] = useState({ username: "", password: "" });

    useEffect(() => {
        async function fetchLoginStatus() {
            setLoginStatus(await getLoginStatus());
        }

        fetchLoginStatus();
    }, []);

    async function handleLogin(e) {
        e.preventDefault();

        const response = await fetch(
            import.meta.env.VITE_SERVER_FULL_DOMAIN + "/login",
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                method: "POST",
                body: new URLSearchParams({
                    username: form.username,
                    password: form.password,
                }),
                credentials: "include",
            }
        );

        const responseStatus = await response.json();

        console.log(responseStatus);

        if (responseStatus.isAuthenticated) {
            setLoginStatus(responseStatus.isAuthenticated);
        }
    }

    function handleUsername(e) {
        setForm({ ...form, username: e.target.value });
    }

    function handlePassword(e) {
        setForm({ ...form, password: e.target.value });
    }

    return (
        <>
            <div>
                {loginStatus ? (
                    <>
                        <p>
                            You&apos;re already logged in but you can still log
                            in another account or create another!
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
                        value={form.username}
                        onChange={handleUsername}
                        minLength={2}
                        maxLength={64}
                        required
                    />

                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={form.password}
                        onChange={handlePassword}
                        required
                    />

                    <button type="submit">Enter</button>
                </form>
            </div>
            <div>
                <h2>Signup</h2>

                <form action="/user" method="POST"></form>
            </div>
        </>
    );
}

export default Login;

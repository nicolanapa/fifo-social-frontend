async function getLoginStatus() {
    const response = await fetch(
        import.meta.env.VITE_SERVER_DOMAIN +
            ":" +
            import.meta.env.VITE_SERVER_PORT +
            "/login",
        {
            method: "GET",
            credentials: "include",
        }
    );

    const loginObjectJson = await response.json();

    console.log(loginObjectJson);

    return loginObjectJson.isAuthenticated;
}

export { getLoginStatus };

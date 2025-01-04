async function fetchIsOwner(loggedUserId, xId, typeOfX) {
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
        return loggedUserId === responseObject[0].id ? true : false;
    } else {
        return loggedUserId === responseObject[0].user_id ? true : false;
    }
}

export { fetchIsOwner };

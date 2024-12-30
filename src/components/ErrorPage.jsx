import { useLocation } from "react-router";

function ErrorPage() {
    let { state } = useLocation();

    if (state === null || state === undefined) {
        state = { msg: "", code: "" };
    }

    return (
        <div>
            <h1>{state.code !== "" ? state.code : 500}</h1>
            <h2>
                {state.msg !== "" ? state.msg : "An Unknown Error has happened"}
            </h2>
        </div>
    );
}

export default ErrorPage;

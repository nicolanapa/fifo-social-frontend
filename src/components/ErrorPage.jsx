import { useLocation } from "react-router";

function ErrorPage() {
    let { state } = useLocation();

    if (state === null || state === undefined) {
        state = { msg: "", code: "" };
    }

    return (
        <div className="page-error">
            <div>
                <h1>{state.code !== "" ? state.code : 500}</h1>
                <p className="bold">
                    {state.msg !== ""
                        ? state.msg
                        : "An Unknown Error has happened"}
                </p>
            </div>
        </div>
    );
}

export default ErrorPage;

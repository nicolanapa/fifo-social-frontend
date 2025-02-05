import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import LoginContext from "../context/LoginContext";
import { getLoginObject } from "../scripts/getLoginObject";
import { useNavigate } from "react-router";
import { fetchIsOwner } from "../scripts/fetchIsOwner";
import { createPortal } from "react-dom";
import EditForm from "./EditForm";

function EditX({ xId, typeOfX }) {
    const { loginInfo, setLoginInfo } = useContext(LoginContext);
    const [isOwner, setIsOwner] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        async function settingIsOwner() {
            setIsOwner(await fetchIsOwner(loginInfo.id, xId, typeOfX));
        }

        settingIsOwner();
    }, [loginInfo]);

    async function showModal() {
        const updatedLoginInfo = await getLoginObject();

        setLoginInfo(updatedLoginInfo);

        if (updatedLoginInfo.isAuthenticated) {
            setShowEditForm(!showEditForm);
        }
    }

    async function editThing(e) {
        e.preventDefault();

        const updatedLoginInfo = await getLoginObject();

        await setLoginInfo(updatedLoginInfo);

        if (updatedLoginInfo.isAuthenticated && isOwner) {
            const response = await fetch(e.target.action, {
                method: "PATCH",
                body: new URLSearchParams(
                    typeOfX === "user"
                        ? {
                              description: e.target.description.value,
                          }
                        : typeOfX === "post"
                        ? {
                              title: e.target.title.value,
                              content: e.target.content.value,
                          }
                        : {
                              content: e.target.content.value,
                          }
                ),
                credentials: "include",
            });

            const responseStatus = await response.json();

            if (responseStatus.success) {
                location.reload();
            } else {
                navigate("/errorPage", {
                    state: {
                        code:
                            responseStatus.status !== ""
                                ? responseStatus.status
                                : "",
                        msg:
                            responseStatus.msg !== ""
                                ? responseStatus.msg
                                : "Couldn't edit the " + typeOfX,
                    },
                });
            }
        }
    }

    return (
        <>
            <button
                onClick={showModal}
                disabled={!isOwner}
                className={"styled-button" + (!isOwner ? " disabled" : "")}
            >
                <img
                    src="/icons/editIconFeather.svg"
                    alt={"Edit this " + typeOfX}
                />
            </button>

            {showEditForm &&
                createPortal(
                    <EditForm
                        onClose={() => setShowEditForm(false)}
                        onSubmit={editThing}
                        typeOfX={typeOfX}
                        xId={xId}
                    />,
                    document.body
                )}
        </>
    );
}

EditX.propTypes = {
    xId: PropTypes.number.isRequired,
    typeOfX: PropTypes.oneOf(["user", "post", "comment"]).isRequired,
};

export default EditX;

import PropTypes from "prop-types";
import { useEffect, useState } from "react";

function EditForm({ onClose, onSubmit, typeOfX, xId }) {
    const [inputForm, setInputForm] = useState({
        description: "",
        title: "",
        content: "",
    });

    useEffect(() => {
        async function fetchInputValue() {
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
                setInputForm({
                    ...inputForm,
                    description: responseObject[0].description,
                });
            } else if (typeOfX === "post") {
                setInputForm({
                    ...inputForm,
                    title: responseObject[0].title,
                    content: responseObject[0].content,
                });
            } else if (typeOfX === "comment") {
                setInputForm({
                    ...inputForm,
                    content: responseObject[0].content,
                });
            }
        }

        fetchInputValue();
    }, []);

    const updateInput = (e) => {
        setInputForm({ ...inputForm, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <form
                action={
                    import.meta.env.VITE_SERVER_FULL_DOMAIN +
                    "/" +
                    typeOfX +
                    "/" +
                    xId
                }
                method="POST"
                onSubmit={onSubmit}
            >
                <div>
                    {typeOfX === "user" ? (
                        <>
                            <label htmlFor="description">Description: </label>
                            <input
                                type="text"
                                id="description"
                                name="description"
                                value={inputForm.description}
                                onChange={updateInput}
                                maxLength={150}
                            />
                        </>
                    ) : typeOfX === "post" ? (
                        <>
                            <label htmlFor="title">Title: </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={inputForm.title}
                                onChange={updateInput}
                                minLength={2}
                                maxLength={64}
                                required
                            />

                            <label htmlFor="content">Content: </label>
                            <input
                                type="text"
                                id="content"
                                name="content"
                                value={inputForm.content}
                                onChange={updateInput}
                                maxLength={2000}
                            />
                        </>
                    ) : (
                        <>
                            <label htmlFor="content">Content: </label>
                            <input
                                type="text"
                                id="content"
                                name="content"
                                value={inputForm.content}
                                onChange={updateInput}
                                minLength={1}
                                maxLength={1000}
                                required
                            />
                        </>
                    )}
                </div>
                <button type="submit">Update</button>
            </form>
            <button onClick={onClose}>Cancel</button>
        </div>
    );
}

EditForm.propTypes = {
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    typeOfX: PropTypes.oneOf(["user", "post", "comment"]).isRequired,
    xId: PropTypes.number.isRequired,
};

export default EditForm;

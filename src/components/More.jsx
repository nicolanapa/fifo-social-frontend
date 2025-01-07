import PropTypes from "prop-types";
import DeleteX from "./DeleteX";
import EditX from "./EditX";
import { useState } from "react";
import FavoriteX from "./FavoriteX";

function More({ xId, typeOfX }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <section>
            {isOpen && (
                <div>
                    {typeOfX !== "user" && (
                        <FavoriteX xId={xId} typeOfX={typeOfX} />
                    )}
                    <EditX xId={xId} typeOfX={typeOfX} />
                    <DeleteX xId={xId} typeOfX={typeOfX} />
                </div>
            )}

            <button
                onClick={() => {
                    setIsOpen(!isOpen);
                }}
            >
                <img src="/icons/moreIconFeather.svg" alt="More options" />
            </button>
        </section>
    );
}

More.propTypes = {
    xId: PropTypes.number.isRequired,
    typeOfX: PropTypes.oneOf(["user", "post", "comment"]).isRequired,
};

export default More;

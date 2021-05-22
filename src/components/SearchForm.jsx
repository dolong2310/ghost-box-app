import React, { useRef, useState } from "react";
import Images from "../constants/images";

function SearchForm({ onSubmit }) {
    const [searchTerm, setSearchTerm] = useState("");
    const typingTimeoutRef = useRef(null);

    function handleChange(e) {
        setSearchTerm(e.target.value);

        if (!onSubmit) return;

        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        typingTimeoutRef.current = setTimeout(() => {
            const formValues = {
                searchTerm: e.target.value,
            };

            onSubmit(formValues);
        }, 500);
    }

    return (
        <>
            <div className="search-box">
                <img src={Images.SEARCH_ICON} alt="search-icon" />
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleChange}
                    placeholder="Search Files Name"
                    className="search"
                />
            </div>
        </>
    );
}

export default SearchForm;

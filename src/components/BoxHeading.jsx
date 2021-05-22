import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Select from "react-select";
import { sort } from "../redux/slice/fileSlice";

function BoxHeading(props) {
    const dispatch = useDispatch();
    // if true then trigger > else trigger <
    const [toggleSort, setToggleSort] = useState(true);

    const options = [
        { value: "recent", label: "Recent File" },
        { value: "name", label: "Name" },
        { value: "date", label: "Date" },
    ];

    const handleSelectChange = ({ value }) => {
        const action = {
            value,
            toggleSort,
        };

        dispatch(sort(action));
        setToggleSort(!toggleSort);
    };

    return (
        <div className="box">
            <h3 className="title">File Manager</h3>
            <div className="box-select">
                <Select
                    options={options}
                    placeholder="Recent File"
                    className="box-select-container"
                    classNamePrefix="react-select"
                    onChange={handleSelectChange}
                />
            </div>
        </div>
    );
}

export default BoxHeading;

import React, { useRef, useState } from "react";
import { CgClose } from "react-icons/cg";
import { FaAngleDown, FaAngleUp, FaEllipsisV } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Select, { components } from "react-select";
import { remove } from "../redux/slice/fileSlice";

const options = [
    { value: "more", label: "More" },
    { value: "download", label: "Download" },
    { value: "delete", label: "Delete" },
];

const IndicatorsContainer = (props) => {
    return (
        <components.IndicatorsContainer {...props} className="dropdown-btn">
            <FaEllipsisV />
        </components.IndicatorsContainer>
    );
};

function BoxFile({ fileList }) {
    const downloadLinkElement = useRef(null);
    const dispatch = useDispatch();
    const [showPopup, setShowPopup] = useState(false);
    const [popupInfo, setPopupInfo] = useState(null);

    const nameSortIcon = useSelector((state) => state.file.nameSort);
    const dateSortIcon = useSelector((state) => state.file.dateSort);

    const handleSelectChange = (index) => (value) => {
        if (value.label === "More") {
            setShowPopup(!showPopup);

            // got index then show info file based on index
            const selectedFile = JSON.parse(localStorage.getItem("fileData"))[
                index
            ];

            setPopupInfo({
                id: selectedFile.id,
                date: selectedFile.date,
                name: selectedFile.name,
                size: selectedFile.size,
                type: selectedFile.type,
                image: selectedFile.image,
            });
        }

        if (value.label === "Delete") {
            dispatch(remove(index));
        }

        if (value.label === "Download") {
            downloadLinkElement.current.click();
        }
    };

    const handleShowPopup = () => {
        setShowPopup(!showPopup);
    };

    return (
        <div className="file-box">
            <table className="table">
                <tbody>
                    <tr>
                        <th>
                            Name
                            {nameSortIcon ? (
                                <FaAngleDown className="sort-icon" />
                            ) : (
                                <FaAngleUp className="sort-icon" />
                            )}
                        </th>
                        <th>
                            Date
                            {dateSortIcon ? (
                                <FaAngleDown className="sort-icon" />
                            ) : (
                                <FaAngleUp className="sort-icon" />
                            )}
                        </th>
                        <th>Type</th>
                        <th>Size</th>
                        <th />
                    </tr>
                    {fileList.length > 0 ? (
                        fileList.map((file, index) => (
                            <tr key={file.id}>
                                <td>
                                    <div className="name-box">
                                        <img src={file.image} alt="ai-icon" />
                                        <span>{file.name}</span>
                                    </div>
                                </td>
                                <td>{file.date}</td>
                                <td>{file.type}</td>
                                <td>{file.size}</td>
                                <td>
                                    <div className="dropdown-box">
                                        <Select
                                            options={options}
                                            className="react-select-container"
                                            classNamePrefix="react-select"
                                            components={{ IndicatorsContainer }}
                                            onChange={handleSelectChange(index)}
                                        />
                                        <a
                                            ref={downloadLinkElement}
                                            href="/google.com"
                                            download
                                        >
                                            Download file
                                        </a>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td>
                                <h1>EMPTY!!</h1>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {showPopup && (
                <div className="file-popup">
                    <div className="overlay" onClick={handleShowPopup} />
                    <div className="file-details">
                        <CgClose
                            className="file-close-btn"
                            onClick={handleShowPopup}
                        />
                        <div className="file-heading">
                            <div className="file-image">
                                <img
                                    src={popupInfo.image}
                                    alt={popupInfo.name}
                                />
                            </div>
                            <h3 className="file-title">{popupInfo.name}</h3>
                            <a
                                href="/google.com"
                                download
                                className="file-download"
                            >
                                Download file
                            </a>
                        </div>
                        <div className="file-body">
                            <div className="file-size">
                                <p>File size:</p>
                                <span>{popupInfo.size}</span>
                            </div>
                            <p className="file-date">{popupInfo.date}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default BoxFile;

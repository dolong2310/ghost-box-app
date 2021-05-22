import React from "react";
import { useDispatch } from "react-redux";
import Images from "../constants/images";
import { search } from "../redux/slice/fileSlice";
import SearchForm from "./SearchForm";

function Header(props) {
    const dispatch = useDispatch();

    function handleOnSubmit(value) {
        const dataLS = JSON.parse(localStorage.getItem("fileData"));
        const newData = dataLS.filter((file) => {
            const fileNameLC = file.name.toLowerCase();
            const fileNameUC = file.name.toUpperCase();

            return fileNameLC.includes(value.searchTerm)
                ? file
                : fileNameUC.includes(value.searchTerm) && file;
        });

        dispatch(search(newData));
    }

    return (
        <div className="header">
            <h1 className="title">Ghostbox</h1>
            <div className="control-box">
                <SearchForm onSubmit={handleOnSubmit} />
                <div className="icon-box">
                    <button>
                        <img src={Images.NOTI_ICON} alt="notification-icon" />
                    </button>
                    <button>
                        <img src={Images.FILTER_ICON} alt="filter-icon" />
                    </button>
                </div>
                <div className="account-box">
                    <button>
                        <img src={Images.AVATAR_ICON} alt="avatar" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Header;

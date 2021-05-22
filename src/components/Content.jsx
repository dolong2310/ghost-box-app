import React from "react";
import { useSelector } from "react-redux";
import BoxFile from "./BoxFile";
import BoxHeading from "./BoxHeading";
import Header from "./Header";

function Content(props) {
    const fileList = useSelector((state) => state.file.data);

    return (
        <div className="content">
            <Header />
            <BoxHeading />
            <BoxFile fileList={fileList} />
        </div>
    );
}

export default Content;

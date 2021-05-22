import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import Images from "../constants/images";
import { add } from "../redux/slice/fileSlice";
import { formatTime, randomId } from "../utils";

function SideBarDragArea(props) {
    const dispatch = useDispatch();
    const fileList = useSelector((state) => state.file.data);

    const [showDragArea, setShowDragArea] = useState(false);

    const onDrop = useCallback((acceptedFiles) => {
        // Do something with the files after upload
        setShowDragArea(true);
    }, []);

    const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
        useDropzone({
            onDrop,
            maxFiles: 5,
        });

    let acceptedFileItems = acceptedFiles.map((file) => (
        <p key={file.path}>
            {file.path} - {file.size} bytes
        </p>
    ));

    function handleClick() {
        // if acceptedFileItems length === 0 then nothing happen
        if (acceptedFileItems.length === 0) return;
        const now = new Date();
        const timer = formatTime(now);

        // ready array data to concat with state.data
        const filesData = acceptedFileItems.map((file) => {
            const newFile = {
                id: randomId(),
                name: file.key,
                date: timer,
                type: file.key.split(".")[1].toUpperCase(),
                size: `${Math.max(file.props.children[2] / 1024 / 1024).toFixed(
                    2
                )} MB`,
                image: Images.AI_ICON,
            };
            return newFile;
        });

        const data = fileList.concat(filesData);

        dispatch(add(data));
        setShowDragArea(false);
    }

    return (
        <>
            {/* showDragArea true => show files, btn-primary, non-disabled */}
            {/* showDragArea false => show area, btn, disabled */}
            {acceptedFileItems.length > 0 && showDragArea ? (
                <div className="drag-area">{acceptedFileItems}</div>
            ) : (
                <div
                    {...getRootProps({ className: "dropzone" })}
                    className="drag-area"
                >
                    <input {...getInputProps()} />
                    <p>Drag and Drop file here to upload</p>
                    <span>OR</span>
                    <button className="btn btn-primary">Browse File</button>
                </div>
            )}

            <p className="text-error">
                {fileRejections.length > 0 &&
                    `${fileRejections[0]?.errors[0].message} - upload up to 5 files, please try again.`}
            </p>

            <button
                className={showDragArea ? "btn btn-primary" : "btn"}
                onClick={handleClick}
                disabled={showDragArea ? false : true}
            >
                Upload File
            </button>
        </>
    );
}

export default SideBarDragArea;

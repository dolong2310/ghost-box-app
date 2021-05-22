import { configureStore } from "@reduxjs/toolkit";
import fileReducer from "./slice/fileSlice";

const rootReducer = {
    file: fileReducer,
};

const store = configureStore({
    reducer: rootReducer,
});

export default store;

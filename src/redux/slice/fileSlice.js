import { createSlice } from "@reduxjs/toolkit";
import { convertStringToDate } from "../../utils";

// {
//     id: 1,
//     name: "B File",
//     date: "04/3/2021 10:40AM",
//     type: "Illustrator",
//     size: "2,5 MB",
//     url: Images.AI_ICON,
// },

const fileSlice = createSlice({
    name: "file",
    initialState: {
        data: JSON.parse(localStorage.getItem("fileData")) || [],
        loading: null,
        nameSort: true,
        dateSort: true,
    },
    reducers: {
        add(state, action) {
            // set payload to localStorage
            localStorage.setItem("fileData", JSON.stringify(action.payload));

            state.data = action.payload;
        },
        remove(state, action) {
            // remove payload from localStorage
            console.log(JSON.parse(localStorage.getItem("fileData")));

            state.data.splice(action.payload, 1);

            localStorage.setItem("fileData", JSON.stringify(state.data));
        },
        //{value: "date", toggleSort: true}
        sort(state, action) {
            if (action.payload.value === "name") {
                if (action.payload.toggleSort) {
                    state.nameSort = false; // true: a > z
                    state.data.sort(function (a, b) {
                        const nameA = a.name.toUpperCase();
                        const nameB = b.name.toUpperCase();

                        if (nameA < nameB) return -1;
                        if (nameA > nameB) return 1;
                        return 0;
                    });
                } else {
                    state.nameSort = true; // false: z > a
                    state.data.sort(function (a, b) {
                        const nameA = a.name.toUpperCase();
                        const nameB = b.name.toUpperCase();

                        if (nameA < nameB) return 1;
                        if (nameA > nameB) return -1;
                        return 0;
                    });
                }
            }
            if (action.payload.value === "date") {
                // ex: new Date("2015-03-25 09:45");
                if (!action.payload.toggleSort) {
                    state.dateSort = true; // false: 1 > 9
                    state.data.sort((item1, item2) => {
                        const date1 = convertStringToDate(item1.date);
                        const date2 = convertStringToDate(item2.date);

                        if (date1 > date2) return -1;
                        if (date1 < date2) return 1;
                        return 0;
                    });
                } else {
                    state.dateSort = false; // true: 9 > 1
                    state.data.sort((item1, item2) => {
                        const date1 = convertStringToDate(item1.date);
                        const date2 = convertStringToDate(item2.date);

                        if (date1 > date2) return 1;
                        if (date1 < date2) return -1;
                        return 0;
                    });
                }
            }
        },
        search(state, action) {
            state.data = action.payload;
        },
    },
});

const { actions, reducer } = fileSlice;
export const { add, remove, sort, search } = actions;
export default reducer;

// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import fileApi from "../../api/fileAPI";
// import { convertStringToDate } from "../../utils";

// export const getData = createAsyncThunk("file/getData", async () => {
//     // call API & return data
//     const data = await fileApi.getAll();
//     return data || [];
// });

// const fileSlice = createSlice({
//     name: "file",
//     initialState: {
//         data: [],
//         loading: null,
//         nameSort: true,
//         dateSort: true,
//         status: null,
//     },
//     reducers: {
//         add(state, action) {
//             // set payload to localStorage
//             localStorage.setItem("fileData", JSON.stringify(action.payload));

//             state.data = action.payload;
//             console.log(state.data);

//             // add item to server
//             (async () => {
//                 await fileApi.add(...action.payload);
//             })();
//         },
//         remove(state, action) {
//             // remove payload to localStorage
//             console.log(JSON.parse(localStorage.getItem("fileData")));

//             state.data.splice(action.payload, 1);

//             localStorage.setItem("fileData", JSON.stringify(state.data));
//         },
//         //{value: "date", toggleSort: true}
//         sort(state, action) {
//             if (action.payload.value === "name") {
//                 if (action.payload.toggleSort) {
//                     state.nameSort = false; // true: a > z
//                     state.data.sort(function (a, b) {
//                         const nameA = a.name.toUpperCase();
//                         const nameB = b.name.toUpperCase();

//                         if (nameA < nameB) return -1;
//                         if (nameA > nameB) return 1;
//                         return 0;
//                     });
//                 } else {
//                     state.nameSort = true; // false: z > a
//                     state.data.sort(function (a, b) {
//                         const nameA = a.name.toUpperCase();
//                         const nameB = b.name.toUpperCase();

//                         if (nameA < nameB) return 1;
//                         if (nameA > nameB) return -1;
//                         return 0;
//                     });
//                 }
//             }
//             if (action.payload.value === "date") {
//                 // ex: new Date("2015-03-25 09:45");
//                 if (!action.payload.toggleSort) {
//                     state.dateSort = true; // false: 1 > 9
//                     state.data.sort((item1, item2) => {
//                         const date1 = convertStringToDate(item1.date);
//                         const date2 = convertStringToDate(item2.date);

//                         if (date1 > date2) return -1;
//                         if (date1 < date2) return 1;
//                         return 0;
//                     });
//                 } else {
//                     state.dateSort = false; // true: 9 > 1
//                     state.data.sort((item1, item2) => {
//                         const date1 = convertStringToDate(item1.date);
//                         const date2 = convertStringToDate(item2.date);

//                         if (date1 > date2) return 1;
//                         if (date1 < date2) return -1;
//                         return 0;
//                     });
//                 }
//             }
//         },
//         search(state, action) {
//             state.data = action.payload;
//         },
//     },
//     extraReducers: {
//         [getData.pending]: (state) => {
//             state.status = "loading";
//         },
//         [getData.fulfilled]: (state, action) => {
//             state.data = action.payload;
//             state.status = "success";
//         },
//         [getData.rejected]: (state) => {
//             state.status = "failed";
//         },
//     },
// });

// const { actions, reducer } = fileSlice;
// export const { add, remove, sort, search } = actions;
// export default reducer;

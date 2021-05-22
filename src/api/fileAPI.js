import axiosClient from "./axiosClient";

const fileApi = {
    getAll(params) {
        const url = "/files";
        return axiosClient.get(url, { params });
    },
    get(id) {
        const url = `/files/${id}`;
        return axiosClient.get(url);
    },
    add(data) {
        const url = "/files";
        return axiosClient.post(url, data);
    },
    update(data) {
        const url = `/files/${data.id}`;
        return axiosClient.put(url, data);
    },
    remove(id) {
        const url = `/files/${id}`;
        return axiosClient.delete(url);
    },
};

export default fileApi;

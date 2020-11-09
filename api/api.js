import axios from "axios";

let host = "http://127.0.0.1:8000";

export const queryPeople = (params) => {
    return axios.get(`${host}/peoples/`);
};

export const accuratePeople = (params) => {
    if ("id" in params) {
        return axios.get(`${host}/accuratepeople/` + params.id + "/");
    }
};

export const askworks = (params) => {
    if ("id" in params) {
        console.log(`${host}/works/?author=` + params.id + "/");
        return axios.get(`${host}/works/?author=` + params.id);
    }
};

export const login = (params) => {
    return axios.post(`${host}/login/`, params);
};

//注册

export const register = (parmas) => {
    return axios.post(`${host}/register/`, parmas);
};

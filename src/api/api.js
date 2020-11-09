import Vue from "vue";
var that = this;
let host = "http://127.0.0.1:8000";

export const queryPeople = (params) => {
    return Vue.prototype.$axios.get(`${host}/peoples/`);
};

export const accuratePeople = (params) => {
    if ("id" in params) {
        return Vue.prototype.$axios.get(
            `${host}/accuratepeople/` + params.id + "/"
        );
    }
};

export const askworks = (params) => {
    if ("id" in params) {
        console.log(`${host}/works/?author=` + params.id + "/");
        return Vue.prototype.$axios.get(`${host}/works/?author=` + params.id);
    }
};

export const login = (params) => {
    return Vue.prototype.$axios.post(`${host}/login/`, params);
};

//注册

export const register = (parmas) => {
    return Vue.prototype.$axios.post(`${host}/register/`, parmas);
};

export const getFav = (famouspeopleId) => {
    return Vue.prototype.$axios.get(
        `${host}/modifyuserfavs/` + famouspeopleId + "/"
    );
};

//收藏
export const addFav = (params) => {
    return Vue.prototype.$axios.post(`${host}/modifyuserfavs/`, params);
};

//取消收藏
export const delFav = (peopleId) => {
    return Vue.prototype.$axios.delete(
        `${host}/modifyuserfavs/` + peopleId + "/"
    );
};

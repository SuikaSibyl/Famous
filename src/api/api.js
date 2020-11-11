import Vue from "vue";
var that = this;
let host = "http://10.110.8.238:10000";
// let host = "http://10.110.8.238:10000"

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

export const getAllFavPeople = (parmas) => {
    return Vue.prototype.$axios.get(`${host}/getuserfavs/`, parmas);
};

export const getAllFavWork = (parmas) => {
    return Vue.prototype.$axios.get(`${host}/getuserworkfavs/`, parmas);
};

export const addFavWork = (params) => {
    return Vue.prototype.$axios.post(`${host}/modifyuserworkfavs/`, params);
};

export const delFavWork = (workId) => {
    return Vue.prototype.$axios.delete(
        `${host}/modifyuserworkfavs/` + workId + "/"
    );
};

export const askIsworkFav = (workId) => {
    return Vue.prototype.$axios.get(
        `${host}/modifyuserworkfavs/` + workId + "/"
    );
};

export const searchPeopleName = (params) => {
    return Vue.prototype.$axios.get(`${host}/peoplename/?search=` + params.search, params);
};

export const searchPeopleMajor = (params) => {
    return Vue.prototype.$axios.get(`${host}/peoplemajor/?search=` + params.search, params);
};

export const searchWork = (params) => {
    return Vue.prototype.$axios.get(`${host}/worksearch/?search=` + params.search, params);
};

export const peopleByYear = (params) => {
    if ("id" in params) {
        return Vue.prototype.$axios.get(
            `${host}/peoples/?date=` + params.id
        );
    }
};

async function upload(params) {
    console.log("params", params);
    return Vue.prototype.$axios.post(`${host}/upload/`, params);
}
//传入图片名称，去进行搜索，能够得到对应人物id信息
async function searchpeoplepic(index) {
    return Vue.prototype.$axios.get(
        `${host}/peoplesearchheadimage/?index=` + index
    );
}

async function searchpeopleupload(index) {
    return await Vue.prototype.$axios.get(`${host}/uploadsearch/` + index);
}

export { upload, searchpeoplepic, searchpeopleupload };
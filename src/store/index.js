import Vue from "vue";
import Vuex from "vuex";
import mutations from "./mutations";
import cookie from "../../static/js/cookie.js";
Vue.use(Vuex);
const userInfo = {
    name: cookie.getCookie("name") || "",
    token: cookie.getCookie("token") || "",
};

const state = {
    userInfo,
};
const store = new Vuex.Store({
    state,
    mutations,
    actions: {},
    modules: {},
});
export default store;

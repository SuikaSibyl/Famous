import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Axios from "axios";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(ElementUI);
Vue.prototype.$axios = Axios;

// http request 拦截器
Axios.interceptors.request.use(
    (config) => {
        if (store.state.userInfo.token) {
            // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers.Authorization = `JWT ${store.state.userInfo.token}`;
            config.headers["Access-Control-Allow-Origin"] = "*";
            config.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
        }
        console.log("config", config);
        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);

Axios.interceptors.response.use(undefined, (error) => {
    let res = error.response;
    let that = this;
    console.log("error", error);
    if (res) {
        switch (res.status) {
            case 401:
                // 返回 401 清除token信息并跳转到登录页面
                // store.commit(types.LOGOUT);
                console.log("未登录");
                alert("未登录");
                router.push({ name: "Login" });
                break;
                // router.replace({
                //   path: '/app/login',
                //   query: {redirect: router.currentRoute.fullPath}
                // })
            case 403:
                alert("您没有该操作权限");
                console.log("您没有该操作权限");
                break;
                // alert('您没有该操作权限');
            case 500:
                alert("服务器错误");
                console.log("服务器错误");
                break;
                // alert('服务器错误');
        }
    }
    return Promise.reject(error.response.data); // 返回接口返回的错误信息
});

Vue.config.productionTip = false;

//引入cesium相关文件
var cesium = require("cesium/Cesium");
var widgets = require("cesium/Widgets/widgets.css");

Vue.prototype.cesium = cesium;
Vue.prototype.widgets = widgets;

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");
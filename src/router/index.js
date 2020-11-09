import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Cesium from "../components/Cesium.vue";
import login from "../components/login.vue";
import register from "../components/register.vue";
Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/about/:id",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/About.vue"),
    },
    {
        path: "/cesium",
        name: "Cesium",
        component: Cesium,
    },
    {
        path: "/login",
        name: "Login",
        component: login,
    },
    {
        path: "/register",
        name: "register",
        component: register,
    },
];

const router = new VueRouter({
    // mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;

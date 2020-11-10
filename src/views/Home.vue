<template>
    <div id="container" class="box">
        <el-row :gutter="20" style="z-index:100">
            <el-col :span="6" style="z-index:100">
                <div class="grid-content bg-purple" style="z-index:100">
                    <el-button
                        v-if="IsLog"
                        @click="jump"
                        style="z-index:100"
                        type="primary"
                        icon="el-icon-edit"
                        >welcome back! &nbsp;&nbsp;&nbsp;
                        {{ this.$store.state.userInfo.name }}</el-button
                    >
                    <el-button
                        v-else
                        @click="login"
                        style="z-index:100"
                        type="primary"
                        icon="el-icon-edit"
                        >登录</el-button
                    >

                    <el-button
                        v-if="IsLog"
                        @click="exit"
                        style="z-index:100"
                        type="primary"
                        icon="el-icon-edit"
                        >登出</el-button
                    >
                </div>
            </el-col>
        </el-row>
        <el-container>
            <el-main>
                <Cesium></Cesium>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import Cesium from "@/components/Cesium.vue";
import cookie from "../../static/js/cookie";
import store from "../store";
export default {
    name: "Home",
    data() {
        return { IsLog: false };
    },
    components: {
        Cesium,
    },
    created() {
        if (this.$store.state.userInfo) {
            if (this.$store.state.userInfo.name) this.IsLog = true;
        }
    },
    methods: {
        login() {
            this.$router.push({ name: "Login" });
        },
        jump() {
            //this.$router.push("/cart")
            //传递的参数用{{ $route.query.goodsId }}获取
            this.$router.push({ path: "/about" });
            //this.$router.go(-2)
            //后退两步
        },
        exit() {
            cookie.delCookie("token");
            cookie.delCookie("name");
            this.IsLog = false;
            store.commit("exit");
        },
    },
};
</script>

<template>
<<<<<<< Updated upstream
    <div id="container" class="box">
        <el-container>
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
            <el-main>
                <Cesium></Cesium>
            </el-main>
        </el-container>
    </div>
=======
  <el-container>
    <el-container style="height: 95vh;">
      <el-header class="header"
                 style="padding: 0 20px 10px 20px;"
                 height="84px">
        <div class="row-wrap"
             style="align-items: flex-end;">
          <div style="font-size: 48px; font-weight: lighter; color: #409eff;"><i class="el-icon-map-location"/>文化名人地图</div>
          <div style="margin-left: 20px;">v1.0.0</div>
        </div>
        <div class="row-wrap btn-wrap">
          <el-button type="text"
                     icon="el-icon-s-home"
                     style="font-size: 36px;"
                     disabled
                     @click="returnHome"></el-button>
          <el-button type="text"
                     icon="el-icon-search"
                     style="font-size: 36px;"
                     @click="gotoFilter"></el-button>
          <el-button v-if="IsLog"
                     type="text"
                     icon="el-icon-user-solid"
                     style="font-size: 36px;"
                     @click="gotoUser">{{ this.$store.state.userInfo.name }}</el-button>
          <el-button v-else
                     type="text"
                     icon="el-icon-user"
                     style="font-size: 36px;"
                     @click="login">登录</el-button>
          <el-button v-if="IsLog"
                     type="text"
                     icon="el-icon-switch-button"
                     style="font-size: 36px; color: red;"
                     @click="exit"></el-button>
          <el-button type="text"
                     icon="el-icon-more"
                     style="font-size: 36px;"></el-button>
        </div>
      </el-header>
      <el-container>
        <el-main class="elmain"
                 style="padding: 0;">
          <Cesium></Cesium>
        </el-main>
      </el-container>
      <el-footer class="footer"
                 height="40px">
        2020 DAM | Copyright © 沈吕可晟 鲁昊霖 陆子仪 唐敏哲 周宇轩 all right reserved | Powered by 
        <a href="https://www.djangoproject.com/">Django</a> /
        <a href="https://cn.vuejs.org/">Vue.js</a> /
        <a href="https://element.eleme.cn/#/zh-CN">Element UI</a> /
        <a href="https://cesium.com/index.html">Cesium®</a>
      </el-footer>
    </el-container>
  </el-container>

>>>>>>> Stashed changes
</template>

<script>
import Cesium from '@/components/Cesium.vue'
import cookie from '../../static/js/cookie'
import store from '../store'
export default {
  name: 'Home',
  data() {
    return { IsLog: false }
  },
  components: {
    Cesium,
  },
  created() {
    if (this.$store.state.userInfo) {
      if (this.$store.state.userInfo.name) this.IsLog = true
    }
  },
  methods: {
    login() {
      this.$router.push({ name: 'Login' })
    },
    jumpToMy() {
      //this.$router.push("/cart")
      //传递的参数用{{ $route.query.goodsId }}获取
      this.$router.push({ name: 'userdetail' })
      //this.$router.go(-2)
      //后退两步
    },
    returnHome() {
      this.$router.push({ name: 'Home' })
    },
<<<<<<< Updated upstream
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
=======
    gotoUser() {
      this.$router.push({ name: 'userdetail' })
>>>>>>> Stashed changes
    },
    gotoFilter() {
      this.$router.push({ name: 'filter' })
    },
    exit() {
      cookie.delCookie('token')
      cookie.delCookie('name')
      this.IsLog = false
      store.commit('exit')
    },
  },
}
</script>

<style>
@import url("../../static/main.css");
</style>
<template>
  <el-container>
    <el-container style="height: 100vh;">
      <el-header class="header"
                 style="padding: 0 20px 0px 20px;"
                 height="40px">
        <div class="row-wrap"
             style="align-items: flex-end;">
          <div style="font-size: 28px; font-weight: lighter; color: #409eff;"><i class="el-icon-map-location"/>文化名人地图</div>
          <div style="margin: 0 0 2px 10px;">v1.0.0</div>
        </div>
        <div class="row-wrap btn-wrap">
          <el-button type="text"
                     icon="el-icon-s-home"
                     style="font-size: 24px;"
                     disabled
                     @click="returnHome"></el-button>
          <el-button type="text"
                     icon="el-icon-search"
                     style="font-size: 24px;"
                     @click="gotoFilter"></el-button>
          <el-button v-if="IsLog"
                     type="text"
                     icon="el-icon-user-solid"
                     style="font-size: 24px;"
                     @click="gotoUser">{{ this.$store.state.userInfo.name }}</el-button>
          <el-button v-else
                     type="text"
                     icon="el-icon-user"
                     style="font-size: 24px;"
                     @click="login">登录</el-button>
          <el-button v-if="IsLog"
                     type="text"
                     icon="el-icon-switch-button"
                     style="font-size: 24px; color: red;"
                     @click="exit"></el-button>
          <el-button type="text"
                     icon="el-icon-more"
                     style="font-size: 24px;"></el-button>
        </div>
      </el-header>
      <el-container>
        <el-main class="elmain"
                 style="padding: 0;">
                 <div class="card image-search-bar">
          <form>
            <input type="file" name="file">
            <input type="submit" value="submit">
          </form>
                 </div>

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
    gotoUser() {
      this.$router.push({ name: 'userdetail' })
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
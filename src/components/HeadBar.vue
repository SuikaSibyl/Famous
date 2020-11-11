<template>
  <el-header class="header"
             style="padding: 0 20px 0px 20px;"
             height="40px">
    <div class="row-wrap"
         style="align-items: flex-end;">
      <div class="page-back"
           @click="goBack"><i class="el-icon-back" /><span style="margin: 0 20px 0 10px;">返回</span></div>
      <div style="font-size: 28px; font-weight: lighter; color: #409eff;"><i class="el-icon-map-location" />文化名人地图</div>
      <div style="margin: 0 0 2px 10px;">v1.0.0</div>
      <div style="font-size: 24px; margin: 0 0 5px 40px;">{{ title }}</div>
    </div>
    <div class="row-wrap btn-wrap">
      <el-tooltip class="item"
                  effect="dark"
                  content="首页"
                  placement="bottom-end">
        <el-button type="text"
                   icon="el-icon-s-home"
                   style="font-size: 24px;"
                   :disabled="current=='home'?true:false"
                   @click="returnHome"></el-button>
      </el-tooltip>
      <el-tooltip class="item"
                  effect="dark"
                  content="搜索"
                  placement="bottom-end">
        <el-button type="text"
                   icon="el-icon-search"
                   style="font-size: 24px;"
                   :disabled="current=='search'?true:false"
                   @click="gotoFilter"></el-button>
      </el-tooltip>
      <el-tooltip class="item"
                  effect="dark"
                  :content="IsLog?'我的':'登录'"
                  placement="bottom-end">

        <el-button type="text"
                   :icon="IsLog?'el-icon-user-solid':'el-icon-user'"
                   style="font-size: 24px;"
                   :disabled="current=='my'?true:false"
                   @click="gotoUser">{{ this.$data.IsLog?this.$store.state.userInfo.name:'' }}</el-button>
      </el-tooltip>
      <el-tooltip class="item"
                  effect="dark"
                  content="更多"
                  placement="bottom-end">

        <el-button type="text"
                   icon="el-icon-more"
                   style="font-size: 24px;"></el-button>
      </el-tooltip>

      <el-tooltip class="item"
                  effect="dark"
                  content="登出"
                  placement="bottom-end">

        <el-button v-if="IsLog"
                   type="text"
                   icon="el-icon-switch-button"
                   style="font-size: 24px; color: #F56C6C;"
                   @click="exit"></el-button>
      </el-tooltip>
    </div>

  </el-header>
</template>
<script>
import cookie from '../../static/js/cookie.js'
export default {
  name: 'HeadBar',
  props: {
    current: String,
    title: String,
  },
  data() {
    return {
      IsLog: false,
    }
  },
  created() {
    if (this.$store.state.userInfo) {
      if (this.$store.state.userInfo.name) this.IsLog = true
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    returnHome() {
      this.$router.push({ name: 'Home' })
    },
    gotoUser() {
      if (this.$data.IsLog) {
        this.$router.push({ name: 'userdetail' })
      } else {
        this.login()
      }
    },
    gotoFilter() {
      this.$router.push({ name: 'filter' })
    },
    login() {
      this.$router.push({ name: 'Login' })
    },
    exit() {
      cookie.delCookie('token')
      cookie.delCookie('name')
      this.IsLog = false
      this.$message('用户已退出登录')
      this.$router.push({ name: 'Home' })
      store.commit('exit')
    },
  },
}
</script>
<style >
@import url('../../static/main.css');
</style>

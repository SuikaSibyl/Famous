<template>
  <el-container>
    <el-container style="height: 95vh;">
      <el-header class="header"
                 style="padding: 0 20px 10px 20px;"
                 height="84px">
        <div class="row-wrap"
             style="align-items: flex-end;">
          <div class="page-back"
               @click="goBack"><i class="el-icon-back" /><span style="margin: 0 20px 0 10px;">返回</span></div>
          <div style="font-size: 48px; font-weight: lighter; color: #409eff;"><i class="el-icon-map-location"/>文化名人地图</div>
          <div style="margin-left: 20px;">v1.0.0</div>
          <div style="font-size: 36px; margin-left: 40px;">我的</div>
        </div>
        <div class="row-wrap btn-wrap">
          <el-button type="text"
                     icon="el-icon-s-home"
                     style="font-size: 36px;"
                     @click="returnHome"></el-button>
          <el-button type="text"
                     icon="el-icon-search"
                     style="font-size: 36px;"
                     @click="gotoFilter"></el-button>
          <el-button type="text"
                     icon="el-icon-user-solid"
                     style="font-size: 36px;"
                     disabled
                     @click="gotoUser">{{ this.$store.state.userInfo.name }}</el-button>
          <el-button type="text"
                     icon="el-icon-more"
                     style="font-size: 36px;"></el-button>
        </div>

      </el-header>
      <el-container>
        <el-aside width="300px"
                  class="aside">
        </el-aside>
        <el-main>
          <el-divider class="divider"
                      content-position="left">人物收藏</el-divider>
          <div class="search-wrap">
            <div v-for="item in favPeople"
                 class="search-card"
                 :key="item">
              <div class="search-block">
                <el-button style="padding: 5px; right: 44px;"
                           type="primary"
                           icon="el-icon-info"
                           circle
                           @click="gotoPeople(item.id)"></el-button>
                <el-button style="padding: 5px;"
                           @click="deletePeople(item.famouspeople.id)"
                           type="danger"
                           icon="el-icon-delete"
                           circle></el-button>
                <el-image :src="item.famouspeople.headimage"
                          fit="cover"
                          style="height: 200px; width: 150px;">
                  <div slot="error"
                       class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
                <div>
                  <span class="tags">{{ item.famouspeople.major }}</span><span style="font-size: 24px; margin-left: 5px;">{{ item.famouspeople.name }}</span>
                </div>
                <div style="font-size: 16px; margin-top: 5px;">{{ item.famouspeople.birthplace }}</div>
              </div>
            </div>
          </div>
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
import { getAllFavPeople, getAllFavWork } from '../api/api'
import cookie from '../../static/js/cookie.js'
export default {
  name: 'Home',
  data() {
    return {
      favPeople: [],
      favWorks: [],
      url:
        'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
      IsLog: false,
    }
  },
  created: function () {
    getAllFavPeople().then((response) => {
      this.favPeople = response.data
      console.log('data', response.data)
    })
    getAllFavWork().then((response) => {
      this.favWorks = response.data
      console.log('data', response.data)
    })
    if (this.$store.state.userInfo) {
      if (this.$store.state.userInfo.name) this.IsLog = true
    }
  },
  methods: {
    deletePeolple(id) {
      delFav(id)
        .then((response) => {
          console.log(response.data)
          getAllFavPeople().then((response) => {
            this.favPeople = response.data
            console.log('data', response.data)
          })
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    deleteWork(id) {
      delFavWork(id)
        .then((response) => {
          console.log(response.data)
          getAllFavPeople().then((response) => {
            this.favWorks = response.data
            console.log('data', response.data)
          })
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    goBack() {
      this.$router.go(-1)
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
  },
}
</script>

<style>
@import url('../../static/main.css');
</style>

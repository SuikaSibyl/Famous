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
          <div style="font-size: 36px; margin-left: 40px;">人物详情</div>
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
                     @click="gotoUser">{{ this.$store.state.userInfo.name }}</el-button>
          <el-button type="text"
                     icon="el-icon-more"
                     style="font-size: 36px;"></el-button>
        </div>

      </el-header>
      <el-container>
        <el-aside width="500px"
                  class="aside">
          <div class="column-wrap">
            <div class="row-wrap margin-bottom">
              <div class="avatar-wrap"
                   style="margin-right: 20px;">
                <el-image :src="url"
                          :preview-src-list="[url]"
                          fit="contain">
                </el-image>
              </div>
              <div class="column-wrap margin-bottom">
                <div class="row-wrap">
                  <div style="font-size: 48px; font-weight: lighter;">{{ name }}</div>
                  <div style="line-height: 40px; color: gray; margin-left: 4px;">({{ gender }})</div>
                </div>
                <div>
                  <el-button v-if="hasFav"
                             @click="deleteCollect"
                             style="z-index:100"
                             type="warning"
                             icon="el-icon-star-on"
                             size="medium"
                             round>取消收藏</el-button>
                  <el-button class="el-button-modify"
                             v-else
                             @click="addCollect"
                             style="z-index:100"
                             type="primary"
                             icon="el-icon-star-off"
                             size="medium"
                             round>收藏人物</el-button>
                </div>
                <div>{{ dateofbirth }} - {{ dateofdeath?dateofdeath:'?' }}</div>
                <div>出生地：{{ birthplace }}</div>
                <div>专业：{{ major }}</div>
                <div>国籍：{{ nationality }}</div>
              </div>
            </div>
            <div class="margin-bottom">
              <div>简介：{{ introduction }}</div>
              <div>毕业院校：{{ academy }}</div>
              <div>代表作品：{{ repwork }}</div>
              <div>主要成就：{{ majorAchv }}</div>
            </div>
          </div>
        </el-aside>
        <el-main class="elmain">
          <el-carousel style="height: 100%;"
                       :autoplay="false"
                       trigger="click">
            <el-carousel-item v-for="item in works"
                              :key="item">
              <el-image style="width: 100%; height: 100%; background-color: white;"
                        :src="item.image"
                        fit="contain"></el-image>
              <div class="work-btn-wrap">
                <el-button v-if="item.hasFav"
                           @click="deleteCollectWork(item.id)"
                           style="z-index:100"
                           type="warning"
                           icon="el-icon-star-on"
                           size="medium"
                           round>取消收藏</el-button>
                <el-button v-else
                           @click="addCollectWork(item.id)"
                           style="z-index:100"
                           type="primary"
                           icon="el-icon-star-off"
                           size="medium"
                           round>收藏作品</el-button>
              </div>
            </el-carousel-item>
          </el-carousel>
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
import {
  accuratePeople,
  askworks,
  getFav,
  addFav,
  delFav,
  addFavWork,
  delFavWork,
  askIsworkFav,
} from '../api/api'
import cookie from '../../static/js/cookie.js'
export default {
  name: 'Home',
  data() {
    return {
      name: name,
      id: this.$route.params.id,
      dateofbirth: null,
      dateofdeath: null,
      birthplace: null,
      major: null,
      gender: null,
      introduction: null,
      nationality: null,
      academy: null,
      repwork: null,
      majorAchv: null,
      works: [],
      hasFav: false,
      url:
        'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
      IsLog: false,
    }
  },
  created: function () {
    accuratePeople({
      id: parseInt(this.$route.params.id),
    }).then((response) => {
      this.$data.name = response.data.name
      this.$data.url = response.data.headimage
      this.$data.dateofbirth = response.data.dateofbirth
      this.$data.dateofdeath = response.data.dateofdeath
      this.$data.birthplace = response.data.birthplace
      this.$data.major = response.data.major
      this.$data.gender = response.data.gender
      this.$data.introduction = response.data.introduction
      this.$data.nationality = response.data.nationality
      this.$data.academy = response.data.academy
      this.$data.repwork = response.data.repwork
      this.$data.majorAchv = response.data.majorAchv
      if (cookie.getCookie('token')) {
        getFav(parseInt(this.$route.params.id))
          .then((response) => {
            this.hasFav = true
          })
          .catch(function (error) {
            console.log(error.response)
          })
      }
      if (this.$store.state.userInfo) {
        if (this.$store.state.userInfo.name) this.IsLog = true
      }
    })

    var that = this
    askworks({
      id: this.$route.params.id,
    }).then((response) => {
      response.data.forEach(function (single, index) {
        console.log('single', single)
        askIsworkFav(single.id)
          .then((response) => {
            single['isFav'] = true
            that.$data.works.push(single)
            console.log('sss', single)
          })
          .catch(function (error) {
            single['isFav'] = false
            that.$data.works.push(single)
            console.log('erro', error)
            console.log('ssss', single)
          })
      })
    })
  },
  methods: {
    addCollect() {
      addFav({ famouspeople: this.$route.params.id })
        .then((response) => {
          console.log(response.data)
          this.hasFav = true
          alert('已成功加入收藏夹')
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    deleteCollect() {
      delFav(this.$route.params.id)
        .then((response) => {
          console.log(response.data)
          this.hasFav = false
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    addCollectWork(workid) {
      console.log('addcollectwork:', workid)
      addFavWork({ works: workid })
        .then((response) => {
          console.log(response.data)
          alert('已成功加入收藏夹')
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    deleteCollectWork(workid) {
      delFavWork(workid)
        .then((response) => {
          console.log(response.data)
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

.el-carousel__container {
  position: relative;
  height: inherit;
}
</style>

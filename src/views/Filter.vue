<template>
  <el-container>
    <el-container style="height: 100vh;">
      <el-header class="header"
                 style="padding: 0 20px 0px 20px;"
                 height="40px">
        <div class="row-wrap"
             style="align-items: flex-end;">
          <div class="page-back"
               @click="goBack"><i class="el-icon-back" /><span style="margin: 0 20px 0 10px;">返回</span></div>
          <div style="font-size: 28px; font-weight: lighter; color: #409eff;"><i class="el-icon-map-location"/>文化名人地图</div>
          <div style="margin: 0 0 2px 10px;">v1.0.0</div>
          <div style="font-size: 24px; margin-left: 40px;">搜索</div>
        </div>
        <div class="row-wrap btn-wrap">
          <el-button type="text"
                     icon="el-icon-s-home"
                     style="font-size: 24px;"
                     @click="returnHome"></el-button>
          <el-button type="text"
                     icon="el-icon-search"
                     style="font-size: 24px;"
                     disabled
                     @click="gotoFilter"></el-button>
          <el-button type="text"
                     icon="el-icon-user-solid"
                     style="font-size: 24px;"
                     @click="gotoUser">{{ this.$store.state.userInfo.name }}</el-button>
          <el-button type="text"
                     icon="el-icon-more"
                     style="font-size: 24px;"></el-button>
        </div>

      </el-header>
      <el-container>
        <el-aside width="250px"
                  class="aside">
          <div style="margin-top: 15px;">
            <el-input placeholder="搜索人物"
                      prefix-icon="el-icon-user"
                      v-model="peoplename"
                      style="font-size: 14px;"
                      clearable>
              <el-button slot="append"
                         icon="el-icon-search"
                         @click="searchpeoplename"></el-button>
            </el-input>
          </div>
          <div style="margin-top: 15px;">
            <el-input placeholder="搜索作品"
                      prefix-icon="el-icon-picture-outline-round"
                      v-model="workname"
                      style="font-size: 14px;"
                      clearable>
              <el-button slot="append"
                         icon="el-icon-search"
                         @click="searchWorks"></el-button>
            </el-input>
          </div>
          <div style="margin-top: 15px;">
            <el-input placeholder="搜索专业"
                      prefix-icon="el-icon-collection-tag"
                      v-model="major"
                      style="font-size: 14px;"
                      clearable>
              <el-button slot="append"
                         icon="el-icon-search"
                         @click="searchpeoplemajor"></el-button>
            </el-input>
          </div>
        </el-aside>
        <el-main>
          <div class="search-wrap">
            <div v-for="item in searchResults"
                 class="search-card"
                 :key="item">
              <div class="search-block">
                <el-button style="padding: 5px;"
                           type="primary"
                           icon="el-icon-info"
                           circle
                           @click="gotoPeople(item.id)"></el-button>

                <el-image :src="item.headimage"
                          fit="cover"
                          style="height: 160px; width: 120px;">
                  <div slot="error"
                       class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
                <div>
                  <span class="tags" style="margin: auto 0;">{{ item.major }}</span><span style="font-size: 18px; margin-left: 5px;">{{ item.name }}</span>
                </div>
                <div style="font-size: 12px; margin-top: 5px;">{{ item.birthplace }}</div>
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
import { searchPeopleName, searchPeopleMajor, searchWork } from '../api/api'
import cookie from '../../static/js/cookie.js'
export default {
  name: 'Home',
  data() {
    return {
      workname: '',
      peoplename: '',
      major: '',
      searchResults: [],
      IsLog: false,
    }
  },
  created: function () {
    if (this.$store.state.userInfo) {
      if (this.$store.state.userInfo.name) this.IsLog = true
    }
  },
  methods: {
    searchWorks() {
      searchWork({ search: this.$data.workname })
        .then((response) => {
          console.log(response.data)
          this.searchResults = response.data
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    searchpeoplename() {
      console.log(this.$data.peoplename)
      searchPeopleName({ search: this.$data.peoplename })
        .then((response) => {
          console.log(response.data)
          this.searchResults = response.data
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    searchpeoplemajor() {
      searchPeopleMajor({ search: this.$data.major })
        .then((response) => {
          console.log(response.data)
          this.searchResults = response.data
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    goBack() {
      this.$router.go(-1)
    },
    gotoPeople(id) {
      this.$router.push({ path: 'about/' + id })
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
.el-select .el-input {
  width: 130px;
}
</style>
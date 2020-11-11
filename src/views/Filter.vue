<template>
  <el-container>
    <el-container style="height: 100vh;">
      <HeadBar current="search"
               title="搜索"></HeadBar>
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
          <el-divider class="divider-about"
                      content-position="left">年代</el-divider>
          <div class="row-wrap"
               style="flex-wrap: wrap;">
            <div style="margin: 0 10px 0 10px;"
                 v-for="item in age"
                 :key="item">
              <el-button type="text">{{ item }}年代</el-button>
            </div>
          </div>

        </el-aside>
        <el-main>
          <div class="search-wrap">
            <div v-for="item in searchResults"
                 class="search-card"
                 :key="item.id">
              <div class="search-block">
                <el-button v-if="item.author" style="padding: 5px;"
                           type="primary"
                           icon="el-icon-info"
                           circle
                           @click="gotoPeople(item.title?item.author.id:item.id)"></el-button>

                <el-image :src="item.title?item.image:item.headimage"
                          fit="cover"
                          style="height: 160px; width: 120px;">
                  <div slot="error"
                       class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
                <div>
                  <span class="tags"
                        style="margin: auto 0;">{{ item.title?(item.author?item.author.major:'无作者信息'):item.major }}</span><span v-if="item.title" style="font-size: 18px; margin-left: 5px;">{{ item.name }}</span>
                </div>
                <div style="font-size: 12px; margin-top: 5px;">{{ item.title?item.title:item.birthplace }}</div>
              </div>
            </div>
          </div>
        </el-main>
      </el-container>
      <el-footer class="footer"
                 height="40px">
        <FootBar></FootBar>
      </el-footer>
    </el-container>
  </el-container>
</template>

<script>
import { searchPeopleName, searchPeopleMajor, searchWork } from '../api/api'
import cookie from '../../static/js/cookie.js'
import HeadBar from '../components/HeadBar'
import FootBar from '../components/FootBar'
export default {
  name: 'Home',
  data() {
    return {
      workname: '',
      peoplename: '',
      major: '',
      searchResults: [],
      IsLog: false,
      age: [20, 30, 40, 50, 60, 70, 80, 90],
    }
  },
  components: {
    HeadBar,
    FootBar,
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
    gotoPeople(id) {
      this.$router.push({ path: 'about/' + id })
    },
  },
}
</script>

<style>
.el-select .el-input {
  width: 130px;
}
</style>

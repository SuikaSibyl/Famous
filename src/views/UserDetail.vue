<template>
  <el-container>
    <el-container style="height: 98vh;">
      <HeadBar current="my"
               title="我的收藏"></HeadBar>
      <el-container>
        <el-aside width="200px"
                  class="aside">
        </el-aside>
        <el-main>
          <el-divider class="divider"
                      content-position="left">人物收藏</el-divider>
          <div class="search-wrap">
            <div v-for="(item, index) in favPeople"
                 class="search-card"
                 :key="item.famouspeople.id">
              <div class="search-block">
                <el-button style="padding: 5px; right: 44px;"
                           type="primary"
                           icon="el-icon-info"
                           circle
                           @click="gotoPeople(item.famouspeople.id)"></el-button>
                <el-button style="padding: 5px;"
                           @click="deletePeople(item.famouspeople.id, index)"
                           type="danger"
                           icon="el-icon-delete"
                           circle></el-button>
                <el-image :src="item.famouspeople.headimage"
                          fit="cover"
                          :preview-src-list="[item.famouspeople.headimage]"
                          style="height: 160px; width: 120px;">
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
          <el-divider class="divider"
                      content-position="left">作品收藏</el-divider>
          <div class="search-wrap">
            <div v-for="(item, index) in favWorks"
                 class="search-card"
                 :key="item.works.id">
              <div class="search-block">
                <el-button style="padding: 5px; right: 44px;"
                           type="primary"
                           icon="el-icon-info"
                           circle
                           @click="gotoPeople(item.works.author.id)"></el-button>
                <el-button style="padding: 5px;"
                           @click="deleteWork(item.works.id, index)"
                           type="danger"
                           icon="el-icon-delete"
                           circle></el-button>
                <el-image :src="item.works.image"
                          fit="cover"
                          :preview-src-list="[item.works.image]"
                          style="height: 160px; width: 120px;">
                  <div slot="error"
                       class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
                <div>
                  <span class="tags">{{ item.works.author.major }}</span>
                </div>
                <div style="font-size: 16px; margin-top: 5px;">{{ item.works.title }}</div>
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
import { getAllFavPeople, getAllFavWork, delFavWork, delFav } from '../api/api'
import cookie from '../../static/js/cookie.js'
import HeadBar from '../components/HeadBar'
import FootBar from '../components/FootBar'
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
  components: {
    HeadBar,
    FootBar,
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
    deletePeople(id, index) {
      delFav(id)
        .then((response) => {
          console.log(response.data)
          this.$message('已取消收藏')
          getAllFavPeople().then((response) => {
            this.favPeople = response.data
            console.log('data', response.data)
          })
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    deleteWork(id, index) {
      delFavWork(id)
        .then((response) => {
          console.log(response.data)
          this.$message('已取消收藏')
          getAllFavWork().then((response) => {
            this.favWorks = response.data
            console.log('data', response.data)
          })
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
@import url('../../static/main.css');
</style>

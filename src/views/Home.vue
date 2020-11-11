<template>
  <el-container>
    <el-container style="height: 100vh;">
      <HeadBar current="home"></HeadBar>
      <el-container>
        <el-main class="elmain"
                 style="padding: 0;">
          <div class="card image-search-bar">
            <form>
              <input type="file"
                     name="file">
              <input type="submit"
                     value="submit">
            </form>
          </div>
          <Cesium></Cesium>
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
import Cesium from '@/components/Cesium.vue'
import cookie from '../../static/js/cookie'
import store from '../store'
import HeadBar from '../components/HeadBar'
import FootBar from '../components/FootBar'
export default {
  name: 'Home',
  data() {
    return { IsLog: false }
  },
  components: {
    Cesium,
    HeadBar,
    FootBar
  },
  created() {},
  methods: {},
}
</script>

<style>
@import url('../../static/main.css');
</style>
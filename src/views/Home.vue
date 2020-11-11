<template>
  <el-container>
    <el-container style="height: 100vh;">
      <HeadBar current="home"></HeadBar>
      <el-container>
        <el-main class="elmain"
                 style="padding: 0;">
          <div class="card image-search-bar">
            <input type="file"
                   name="file"
                   id="file1" />
            <button @click="add">添加</button>
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
import { upload, searchpeoplepic, searchpeopleupload } from '../api/api'
import Vue from 'vue'
export default {
  name: 'Home',
  data() {
    return {
      IsLog: false,
      result: [],
      IsRes: false,
      respic: '',
      uploadpic: '',
      recordid: '',
    }
  },
  components: {
    Cesium,
    HeadBar,
    FootBar,
  },
  created() {},
  methods: {
    async add() {
      var that = this
      var data = new FormData()
      var image = document.getElementById('file1').files[0]
      console.log(image)
      data.append('file', image)
      data.append('headers', {
        'Content-Type': 'multipart/form-data',
      })
      console.log(data)
      var res = await upload(data)
      console.log('res', res)
      if (res.data.result[0] == '-1') {
        that.$data.IsRes = false
      } else {
        that.$data.IsRes = true
        that.$data.recordid = res.data.recordid
        console.log('that.$data.recordid', that.$data.recordid)

        var temp = []
        res.data.result.forEach(async function (item, index) {
          console.log(item)
          temp.push(searchpeoplepic(item))
        })

        Promise.all(temp).then(async (res) => {
          for (var i = 0; i < temp.length; i++) {
            console.log('res[i]', i, res[i])
            this.$data.result.push(res[i].data[0])
          }
        })
      }
      var res2 = await searchpeopleupload(that.$data.recordid)
      console.log('res2', res2)
      that.$data.respic = res2.data.resimage
      that.$data.uploadpic = res2.data.image

      console.log(
        this.$data.IsRes,
        this.$data.respic,
        this.$data.uploadpic,
        this.$data.recordid,
        this.$data.result
      )
    },
  },
}
</script>

<style>
@import url('../../static/main.css');
</style>
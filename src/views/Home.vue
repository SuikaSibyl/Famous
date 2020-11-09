<template>
  <div id="container" class="box">
    <el-container>
      <el-button @click="jump" style="z-index:100" type="primary" icon="el-icon-edit"></el-button>
      <el-main>
        <Cesium></Cesium>
      </el-main>
    </el-container>
  </div>
</template>
  
<script>
import Cesium from  '@/components/Cesium.vue'

export default {
  name: 'Home',
  components:{
    Cesium,
  },
  methods:{
    jump(){
    //this.$router.push("/cart")
    //传递的参数用{{ $route.query.goodsId }}获取
    this.$router.push({path: '/about'})
    //this.$router.go(-2)
    //后退两步
    }

  }
};
</script>
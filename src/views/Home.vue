<template>
  <div id="container" class="box">
    <div id="cesiumContainer"></div>
  </div>
</template>
 
<script>
export default {
  name: 'Home',
  mounted(){
    this.init()
  },
  methods: {
    init() {
      let Cesium = this.cesium
      let viewer = new Cesium.Viewer('cesiumContainer');
      viewer._cesiumWidget._creditContainer.style.display = "none";// 隐藏版权
    }
  }
};
</script>
 
<style lang='scss' scoped>
html,
body,
#cesiumContainer {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
.box {
  height: 100%;
} 
</style>
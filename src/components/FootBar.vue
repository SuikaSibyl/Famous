<template>
  <div>
    2020 DAM | Copyright ©
    <el-popover placement="bottom"
                title="沈吕可晟 | 浙江大学 | 计算机学院"
                width="300"
                trigger="click">
      <div>
        <el-tag type="primary">Github</el-tag>
        <el-link href='https://github.com/Fantast416'
                 type="primary">LuniumLuk</el-link>
      </div>
      <div style="margin-top: 5px;">
        <el-tag type="success">Mail</el-tag><span style="color: #67C23A;">3180101044@zju.edu.cn</span>
      </div>
      <el-button type="text"
                 slot="reference">沈吕可晟</el-button>
    </el-popover>
    &nbsp;
    <el-link :underline="false"
             href='https://github.com/SuikaSibyl'
             type="primary">鲁昊霖</el-link>
    &nbsp;
    <el-popover placement="bottom"
                title="陆子仪 | 浙江大学 | 计算机学院"
                width="300"
                trigger="click">
      <div>
        <el-tag type="primary">Github</el-tag>
        <el-link href='https://github.com/LuniumLuk'
                 type="primary">LuniumLuk</el-link>
      </div>
      <div style="margin-top: 5px;">
        <el-tag type="success">Mail</el-tag><span style="color: #67C23A;">3180101939@zju.edu.cn</span>
      </div>
      <el-button type="text"
                 slot="reference">陆子仪</el-button>
    </el-popover>
    &nbsp;
    唐敏哲 周宇轩 all right reserved | Powered by
    <el-link :underline="false"
             href='https://www.djangoproject.com/'
             type="primary">Django</el-link>
    /
    <el-link :underline="false"
             href='https://cn.vuejs.org/'
             type="primary">Vue.js</el-link>
    /
    <el-link :underline="false"
             href='https://element.eleme.cn/#/zh-CN'
             type="primary">Element UI</el-link>
    /
    <el-link :underline="false"
             href='https://cesium.com/index.html'
             type="primary">Cesium®</el-link>
  </div>
</template>
<script>
export default {
  name: 'FootBar',
  data() {
    return {}
  },
  created() {},
  methods: {},
}
</script>
<style >
@import url('../../static/main.css');

.el-tag {
  margin-right: 5px;
}
</style>

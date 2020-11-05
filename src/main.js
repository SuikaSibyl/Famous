import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

 
//引入cesium相关文件
var cesium = require('cesium/Cesium');
var widgets= require('cesium/Widgets/widgets.css');

Vue.prototype.cesium = cesium
Vue.prototype.widgets = widgets

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

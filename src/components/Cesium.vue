<template>
  <div class="elmain">
    <div class="slider">
      <el-slider :min="1900"
                 :max="2020"
                 v-model="value"
                 show-input
                 style="width: 800px; margin: 0 20px 0 20px;">
      </el-slider>
      <el-button type="primary"
                 icon="el-icon-search"
                 style="font-size: 16px; padding: 8px;"
                 @click="byYear"
                 circle></el-button>
    </div>
    <div id="cesiumContainer"></div>
  </div>
</template>

<script>
import { queryPeople, peopleByYear } from '../api/api'
import store from '../store'
export default {
  name: 'Cesium',
  mounted() {
    this.init()
  },
  data() {
    return {
      value: 0,
      viewer: null,
    }
  },
  methods: {
    byYear() {
      let Cesium = this.cesium
      let viewer = this.$data.viewer
      viewer.entities.removeAll()
      let scene = viewer.scene

      function addBillboard(len, lon, id, name, birthplace, headimage) {
        viewer.entities.add({
          name: name,
          position: Cesium.Cartesian3.fromDegrees(len, lon),
          billboard: {
            image: '/blu-circle.png',
            scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.4),
          },
          description:
            '<div id="leftBodyer">' +
            '<img src="' +
            headimage +
            '" />' +
            '</div>' +
            '<div id="mainBodyer">' +
            '<h1>' +
            name +
            '</h1>' +
            '<h3>出生地: ' +
            birthplace +
            '</h3>' +
            '<div><button tag="routerbutton" class="click-test-button" pid=' +
            id +
            '>' +
            '了解更多</button></div>' +
            '</div>',
        })
      }

      // ***********************************************************
      // Add data to the entity
      // ***********************************************************

      peopleByYear({
        id: parseInt(this.$data.value),
      }).then((response) => {
        console.log(response.data)
        response.data.forEach(function (single, index) {
          if (single.latitude != null && single.longitude != null) {
            addBillboard(
              single.longitude,
              single.latitude,
              single.id,
              single.name,
              single.birthplace,
              single.headimage
            )
          }
        })
      })
    },
    init() {
      var self = this

      let Cesium = this.cesium
      Cesium.Ion.defaultAccessToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3ZDJjNGEzNy02MWY0LTQzNWItYTY1My00OGRiMWYxNmUxYWYiLCJpZCI6MzcxMTEsImlhdCI6MTYwNDU1ODQ0M30.OY4BQrSOy5iz0Rubg3NNfzUXKN1fSHc8_ilgxQQGCwI'
      // var widget = new Cesium.CesiumWidget('cesiumContainer');
      this.$data.viewer = new Cesium.Viewer('cesiumContainer', {
        orderIndependentTranslucency: false,
        contextOptions: {
            webgl: {
                alpha: true,
            }
        },
      })
      let viewer = this.$data.viewer
      let scene = viewer.scene
      // viewer.scene.globe.enableLighting = true
      viewer._cesiumWidget._creditContainer.style.display = 'none' // 隐藏版权

      viewer.animation.container.style.display = 'none' //隐藏动画控件
      viewer.timeline.container.style.display = 'none' //隐藏时间线控件
      viewer.geocoder.container.style.display = 'none' //隐藏地名查找控件
      viewer.cesiumWidget.creditContainer.style.display = 'none' //隐藏ceisum标识
      viewer.scene.camera.setView({
        // 初始化相机经纬度
        destination: new Cesium.Cartesian3.fromDegrees(116.2, 39.56, 25000000),
        orientation: {
          heading: Cesium.Math.toRadians(0.0),
          pitch: Cesium.Math.toRadians(-90.0), //从上往下看为-90
          roll: 0,
        },
      })
      // 设置背景
      viewer.scene.skyBox.show = false
      viewer.scene.backgroundColor = new Cesium.Color(0.0, 0.0, 0.0, 0.0)

      var frame = viewer.infoBox.frame

      frame.addEventListener(
        'load',
        function () {
          var cssLink = frame.contentDocument.createElement('link')
          cssLink.href = Cesium.buildModuleUrl('/infobox.css')
          cssLink.rel = 'stylesheet'
          cssLink.type = 'text/css'
          frame.contentDocument.head.appendChild(cssLink)
        },
        false
      )

      function addBillboard(len, lon, id, name, birthplace, headimage) {
        viewer.entities.add({
          name: name,
          position: Cesium.Cartesian3.fromDegrees(len, lon),
          billboard: {
            image: '/blu-circle.png',
            scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.4),
          },
          description:
            '<div id="leftBodyer">' +
            '<img src="' +
            headimage +
            '" />' +
            '</div>' +
            '<div id="mainBodyer">' +
            '<h1>' +
            name +
            '</h1>' +
            '<h3>出生地: ' +
            birthplace +
            '</h3>' +
            '<div><button tag="routerbutton" class="click-test-button" pid=' +
            id +
            '>' +
            '了解更多</button></div>' +
            '</div>',
        })
      }

      // ***********************************************************
      // Set the css of infoBox
      // ***********************************************************

      viewer.infoBox.frame.addEventListener(
        'load',
        function () {
          viewer.infoBox.frame.contentDocument.body.addEventListener(
            'click',
            function (e) {
              if (e.target && e.target.className === 'click-test-button') {
                console.log(
                  this.getElementsByTagName('button')[0].getAttribute('pid')
                )
                self.$router.push({
                  path:
                    '/about/' +
                    this.getElementsByTagName('button')[0].getAttribute('pid'),
                })
              }
            },
            false
          )
        },
        false
      )

      // ***********************************************************
      // Add data to the entity
      // ***********************************************************

      queryPeople().then((response) => {
        console.log(response.data)
        response.data.forEach(function (single, index) {
          if (single.latitude != null && single.longitude != null) {
            addBillboard(
              single.longitude,
              single.latitude,
              single.id,
              single.name,
              single.birthplace,
              single.headimage
            )
          }
        })

        // ***********************************************************
        // Do clustering
        // ***********************************************************
        var dataSource = viewer.dataSourceDisplay.defaultDataSource

        var pixelRange = 15
        var minimumClusterSize = 3
        var enabled = true

        dataSource.clustering.enabled = enabled
        dataSource.clustering.pixelRange = pixelRange
        dataSource.clustering.minimumClusterSize = minimumClusterSize

        var removeListener

        var pinBuilder = new Cesium.PinBuilder()
        var pin50 = pinBuilder
          .fromText('50+', new Cesium.Color(1, 0, 0), 48)
          .toDataURL()
        var pin40 = pinBuilder
          .fromText('40+', new Cesium.Color(1, 0.2, 0), 48)
          .toDataURL()
        var pin30 = pinBuilder
          .fromText('30+', new Cesium.Color(1, 0.4, 0), 48)
          .toDataURL()
        var pin20 = pinBuilder
          .fromText('20+', new Cesium.Color(1, 0.6, 0), 48)
          .toDataURL()
        var pin10 = pinBuilder
          .fromText('10+', new Cesium.Color(1, 0.8, 0), 48)
          .toDataURL()

        var singleDigitPins = new Array(8)
        for (var i = 0; i < singleDigitPins.length; ++i) {
          singleDigitPins[i] = pinBuilder
            .fromText('0' + (i + 2) + ' ', new Cesium.Color(1, 0.9, 0), 48)
            .toDataURL()
        }

        function customStyle() {
          if (Cesium.defined(removeListener)) {
            removeListener()
            removeListener = undefined
          } else {
            removeListener = dataSource.clustering.clusterEvent.addEventListener(
              function (clusteredEntities, cluster) {
                cluster.label.show = false
                cluster.billboard.show = true
                cluster.billboard.id = cluster.label.id
                cluster.billboard.verticalOrigin = Cesium.VerticalOrigin.BOTTOM

                if (clusteredEntities.length >= 50) {
                  cluster.billboard.image = pin50
                } else if (clusteredEntities.length >= 40) {
                  cluster.billboard.image = pin40
                } else if (clusteredEntities.length >= 30) {
                  cluster.billboard.image = pin30
                } else if (clusteredEntities.length >= 20) {
                  cluster.billboard.image = pin20
                } else if (clusteredEntities.length >= 10) {
                  cluster.billboard.image = pin10
                } else {
                  cluster.billboard.image =
                    singleDigitPins[clusteredEntities.length - 2]
                }
              }
            )
          }

          // force a re-cluster with the new styling
          var pixelRange = dataSource.clustering.pixelRange
          dataSource.clustering.pixelRange = 0
          dataSource.clustering.pixelRange = pixelRange
        }

        // start with custom style
        customStyle()

        var viewModel = {
          pixelRange: pixelRange,
          minimumClusterSize: minimumClusterSize,
        }
        Cesium.knockout.track(viewModel)

        // var toolbar = document.getElementById("toolbar");
        // Cesium.knockout.applyBindings(viewModel, toolbar);

        function subscribeParameter(name) {
          Cesium.knockout
            .getObservable(viewModel, name)
            .subscribe(function (newValue) {
              dataSource.clustering[name] = newValue
            })
        }

        subscribeParameter('pixelRange')
        subscribeParameter('minimumClusterSize')

        // var handler = new Cesium.checked(
        //     viewer.scene.canvas
        // );
        // handler.setInputAction(function(movement) {
        //     var pickedLabel = viewer.scene.pick(movement.position);
        //     if (Cesium.defined(pickedLabel)) {
        //         var ids = pickedLabel.id;
        //         if (Array.isArray(ids)) {
        //             for (var i = 0; i < ids.length; ++i) {
        //                 ids[i].billboard.color = Cesium.Color.RED;
        //             }
        //         }
        //     }
        // }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
      })
    },
  },
  created: function () {},
}
</script>

<style scoped>
@import url(/bucket.css);
@import url('../../static/main.css');
</style>
<style lang="scss" scoped>
html,
body,
#cesiumContainer {
  width: 100%;
  height: 88vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-image: url("../../static/images/skybox.jpg");
  background-repeat:no-repeat;
  background-position: center;
  background-size: cover;
}
</style>

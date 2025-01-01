<template>
  <div class="container">
    <div class="nav">
      <div class="time">{{ localTime }}</div>
      <div class="city">切换城市</div>
    </div>

    <div class="city-info">
      <!-- <div class="city-name">南昌</div> -->
      <div class="city-name">{{weatherData.city}}</div>
      <!-- <p class="weather">雾</p> -->
      <p class="weather">{{weatherData.weather}}</p>
      <h2 class="temp">
        <!-- <em>10</em>℃ -->
        <em>{{weatherData.temperature}}</em>℃
      </h2>
      <div class="detail">
        <!-- <span>风力：3级</span> | -->
        <span>风力：{{weatherData.windPower}}级</span> |
        <!-- <span>风向：北风</span> | -->
        <span>风向：{{weatherData.windDirection}}</span> |
        <!-- <span>空气湿度：99</span> -->
        <span>空气湿度：{{weatherData.humidity}}</span>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
*{
  margin: 0;
  padding: 0;
}
.container {
  min-height: 100vh;
  background-color: #000;
  opacity: 0.6;
  color: #fff;
}

.nav {
  overflow: auto;
  padding: 10px;
}

.time {
  float: left;
}

.city {
  float: right;
}

.city-info {
  text-align: center;
}

.temp {
  font-size: 26px;
}

.temp em {
  font-style: normal;
  font-size: 34px;
}
</style>
<script setup>
import { ref, onMounted } from 'vue';
import AMapLoader from '@amap/amap-jsapi-loader';

const localTime = ref('00:00');
const weatherData = ref({});
const initAMap = () => {
  AMapLoader.load({
    key: "fa570555b8dda74c1030c26767e70e34", // 申请好的Web端开发者Key，首次调用 load 时必填
    version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: ['AMap.CitySearch'], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  }).then((AMap) => {
  AMap.plugin('AMap.CitySearch', function () {
    var citySearch = new AMap.CitySearch()

    citySearch.getLocalCity(function (status, result) {
      if (status === 'complete' && result.info === 'OK') {
        // 查询成功，result即为当前所在城市信息
        console.log(result.city);


        //加载天气查询插件
        AMap.plugin('AMap.Weather', function () {
          //创建天气查询实例
          var weather = new AMap.Weather();

          //执行实时天气信息查询
          weather.getLive(result.city, function (err, data) {
            console.log(err, data);
            weatherData.value = data
          });
        });
      }
    })
  })
  })
}

onMounted(() => {
  setInterval(() => {
    localTime.value = new Date().toLocaleString();
  }, 1000);
  initAMap()
})
</script>
你是一个经验丰富的react工程师。请帮我开发一个显示当地城市天气的程序。
UI设计图请参考page.png。只需要将代码安排在App.jsx和App.css中。
具体功能如下：
Step 1: 安装@amap/amap-jsapi-loader。
Step 2: 在index.html头部插入高德地图JS库调用安全码。安全码为"14f4028a302d190865409ee8bedfdcc8"
Step 3: 申明localTime响应式数据，并在useEffect生命周期中使用setInterval方法，每秒更新一次localTime。并同步更新界面上的localTime。
Step 4: 申明weatherData响应式数据，初始值为 {city: '', weather: '', temperature: '',windPower:'', windDirection:'',humidity:'' }
Step 5: 封装initAMap方法，功能为：调用AMapLoader.load方法，加载高德地图JS库。先获得当前城市，再获得当前城市的天气信息。
获得城市和天气信息后响应式地更新weatherData。 
Step 6: 高德API 代码 请参照以下vue实现代码，你需要将其转换为react实现代码。
```
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
```
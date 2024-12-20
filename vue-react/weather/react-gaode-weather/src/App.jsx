// src/App.jsx

import React, { useState, useEffect } from 'react';
import AMapLoader from '@amap/amap-jsapi-loader';
import './App.css';

function App() {
    const [localTime, setLocalTime] = useState(new Date().toLocaleTimeString());
    const [weatherData, setWeatherData] = useState({
        city: '',
        weather: '',
        temperature: '',
        windPower: '',
        windDirection: '',
        humidity: ''
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setLocalTime(new Date().toLocaleTimeString());
        }, 1000);
        initAMap();
        return () => clearInterval(interval);
    }, []);

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
                setWeatherData(data)
                // weatherData.value = data
              });
            });
          }
        })
      })
      })
    }

    useEffect(() => {
        initAMap();
    }, []);

    return (
      <div className="container">
      <div className="nav">
        <div className="time">{ localTime }</div>
        <div className="city">切换城市</div>
      </div>
  
      <div className="city-info">
        <div className="city-name">{weatherData.city}</div>
        <p className="weather">{weatherData.weather}</p>
        <h2 className="temp">
          <em>{weatherData.temperature}</em>℃
        </h2>
        <div className="detail">
          
          <span>风力：{weatherData.windPower}级</span> |
         
          <span>风向：{weatherData.windDirection}</span> |
        
          <span>空气湿度：{weatherData.humidity}</span>
        </div>
      </div>
    </div>
    );
}

export default App;
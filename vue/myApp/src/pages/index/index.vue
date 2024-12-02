<template>
  <view class="page">
    <nut-swiper
        :init-page="2"
        :auto-play="3000"
        pagination-visible
        pagination-color="#426543"
        pagination-unselected-color="#808080"
    >
      <nut-swiper-item v-for="(item, index) in imageList" :key="index" style="height: 200px">
        <img :src="item" alt="" style="height: 100%; width: 100%" draggable="false" />
      </nut-swiper-item>
    </nut-swiper>
    <nut-sticky top="0">
      <view class="top-classify">
        <view v-for="(item, index) in items" :key="index" :class="{ active: activeIndex === index }"
          @click="handleClick(index)">
          <view class="price-d">
            {{ item }}
            <span v-if="item === '价格'">
              <IconFont v-show="priceClickCount === 1" name="triangle-down" />
              <IconFont v-show="priceClickCount === 2" name="triangle-up" />
            </span>
          </view>
        </view>
      </view>
    </nut-sticky>
    <view class="commodities">
      <view class="commodity-card" @click="() => handleClickCommodity(commodity.id)"
        v-for="(commodity, index) in commodities" :key="commodity.id">
        <image class="commodity-image" :src="commodity.image"></image>
        <view class="commodity-detail">
          <view class="commodity-title">{{ commodity.title }}</view>
          <view>
            <span class="commodity-sales-volume">{{ commodity.salesVolumeDesc }}</span>
          </view>
          <view class="commodity-price">
            <nut-price :price="commodity.price" size="normal" />
          </view>
          <view>
            <span class="commodity-sales-explain">{{ commodity.unit }} {{ commodity.explain }} 月销量:{{
          commodity.salesVolume }} </span>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import Taro from '@tarojs/taro'
import { ref } from 'vue';
const imageList = ref([
  'https://storage.360buyimg.com/jdc-article/NutUItaro34.jpg',
  'https://storage.360buyimg.com/jdc-article/NutUItaro2.jpg',
  'https://storage.360buyimg.com/jdc-article/welcomenutui.jpg',
  'https://storage.360buyimg.com/jdc-article/fristfabu.jpg'
])
const items = ['推荐', '销量', '新品', '价格', '仅看有货'];
const activeIndex = ref(0);
const priceClickCount = ref(0);

const handleClick = (index) => {
  activeIndex.value = index;

  if (items[activeIndex.value] === '价格') {
    priceClickCount.value += 1
    if (priceClickCount.value === 3) {
      priceClickCount.value = 1
    }

  } else {
    priceClickCount.value = 0; // 如果点击其他标签，重置价格点击次数
  }

};

const commodities = [
  {
    id: 1,
    title: '广西灵山黄皮果本地产水果 4.5-5斤重，免费寄送到小区',
    price: 88,
    unit: '公斤',
    preSale: true,
    salesVolume: 199,
    salesVolumeDesc: '本店黄皮果销量第1名',
    explain: '包邮 送货到小区',
    image: 'https://th.bing.com/th/id/R.d5282a04673094f3d611a5cffb89d8c6?rik=XitV%2br8b%2bmrIOA&riu=http%3a%2f%2fimg4.taojindi.com%2ftc%2fW%2f201607%2f1469094146843.jpg&ehk=d7vRqUqTT9TgQTkxpz9fx8Tm1Iy%2fkt1NrL2J7iCPDHk%3d&risl=&pid=ImgRaw&r=0'
  },
  {
    id: 2,
    title: '广西 灵山本地产水果 4.5-5斤重，免费寄送到小区',
    price: 77,
    unit: '公斤',
    preSale: false,
    salesVolume: 199,
    salesVolumeDesc: '本店黄皮果销量第1名',
    explain: '包邮 送货到小区',
    image: 'https://th.bing.com/th/id/R.d5282a04673094f3d611a5cffb89d8c6?rik=XitV%2br8b%2bmrIOA&riu=http%3a%2f%2fimg4.taojindi.com%2ftc%2fW%2f201607%2f1469094146843.jpg&ehk=d7vRqUqTT9TgQTkxpz9fx8Tm1Iy%2fkt1NrL2J7iCPDHk%3d&risl=&pid=ImgRaw&r=0'
  },
  {
    id: 3,
    title: '广西 灵山龙眼本地产水果 4.5-5斤重，免费寄送到小区',
    price: 77,
    preSale: false,
    unit: '公斤',
    salesVolume: 999,
    salesVolumeDesc: '本店黄皮果销量第1名',
    explain: '包邮 送货到小区',
    image: 'https://th.bing.com/th/id/R.d5282a04673094f3d611a5cffb89d8c6?rik=XitV%2br8b%2bmrIOA&riu=http%3a%2f%2fimg4.taojindi.com%2ftc%2fW%2f201607%2f1469094146843.jpg&ehk=d7vRqUqTT9TgQTkxpz9fx8Tm1Iy%2fkt1NrL2J7iCPDHk%3d&risl=&pid=ImgRaw&r=0'
  },
  {
    id: 4,
    title: '广西 灵山龙眼本地产水果 4.5-5斤重，免费寄送到小区',
    price: 55.2,
    preSale: false,
    unit: '公斤',
    salesVolume: 999,
    salesVolumeDesc: '本店黄皮果销量第1名',
    explain: '包邮 送货到小区',
    image: 'https://th.bing.com/th/id/R.d5282a04673094f3d611a5cffb89d8c6?rik=XitV%2br8b%2bmrIOA&riu=http%3a%2f%2fimg4.taojindi.com%2ftc%2fW%2f201607%2f1469094146843.jpg&ehk=d7vRqUqTT9TgQTkxpz9fx8Tm1Iy%2fkt1NrL2J7iCPDHk%3d&risl=&pid=ImgRaw&r=0'
  },
  {
    id: 5,
    title: '广西 灵山龙眼本地产水果 4.5-5斤重，免费寄送到小区',
    price: 55.2,
    preSale: false,
    unit: '公斤',
    salesVolume: 999,
    salesVolumeDesc: '本店黄皮果销量第1名',
    explain: '包邮 送货到小区',
    image: 'https://th.bing.com/th/id/R.d5282a04673094f3d611a5cffb89d8c6?rik=XitV%2br8b%2bmrIOA&riu=http%3a%2f%2fimg4.taojindi.com%2ftc%2fW%2f201607%2f1469094146843.jpg&ehk=d7vRqUqTT9TgQTkxpz9fx8Tm1Iy%2fkt1NrL2J7iCPDHk%3d&risl=&pid=ImgRaw&r=0'
  }
]
const handleClickCommodity = (cid) => {
  Taro.navigateTo({
    url: '/pages/commdityDetail/index?id=' + cid,
  })
}
</script>

<style>
.page {
  background-color: #f7f8fa;
}

.commodity-sales-explain {
  color: rgb(145, 143, 143);
  font-size: 20px;
}


.commodity-price {}

.commodity-detail {
  padding: 10px;
}

.commodity-sales-volume {
  background-color: #feefd9;
  color: #d78f36;
  font-size: 20px;
  font-weight: lighter;
  display: inline-block;
  margin: 0 10px 10px 0;
  border-radius: 5px;
}

.commodity-title {
  font-weight: 500;
  font-size: medium;
  margin: 10px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
}

.commodity-card {
  width: 45vw;
  background-color: #fff;
  border-radius: 10px;
}

.commodity-image {
  width: 100%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  height: 350px;
}

.commodities {
  background-color: #f7f8fa;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  padding: 20px;

}

.price-d {
  display: flex;
}

.top-classify {
  width: 100%;
  background-color: #ffffff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 60px;
  font-weight: lighter;
}

.top-classify .active {
  color: #fa2c19;
}
</style>
<template>
  <div ref="swiperContainer" class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide">Slide 1</div>
      <div class="swiper-slide">Slide 2</div>
      <div class="swiper-slide">Slide 3</div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';

const swiperContainer = ref(null);

onMounted(() => {
  new Swiper(swiperContainer.value, {
    loop: true,
   // 滑块之间的间距
    // slidesPerView: 'auto', // 让滑块根据内容自适应宽度
  });
});
</script>

<style scoped>
.swiper-container {
  width: 100%;
  height: 100vh; /* 使 swiper-container 占满整个视口高度 */
  position: relative;
}

.swiper-wrapper {
  display: flex;
}

.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eee;
  width: 100%; /* 每个 slide 宽度可根据需要调整 */
  height: 100%;
  text-align: center;
  font-size: 20px;
}

.swiper-pagination {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
}
</style>

<template>
  <div class="carousel">
    <!-- 图片容器 -->
    <div 
      class="slides" 
      :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
    >
      <div 
        v-for="(color, index) in images" 
        :key="index" 
        class="slide" 
        :style="{ backgroundColor: color }"
      >
        Slide {{ index + 1 }}
      </div>
    </div>

    <!-- 左右箭头 -->
    <button class="arrow left" @click="prevSlide">‹</button>
    <button class="arrow right" @click="nextSlide">›</button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const images = ['#ff6b6b', '#4ecdc4', '#ffe66d', '#1a535c'] // 用颜色块代替图片
const currentIndex = ref(0)
let timer = null

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % images.length
}

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + images.length) % images.length
}

onMounted(() => {
  timer = setInterval(nextSlide, 3000) // 每 3 秒自动切换
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<style scoped>
.carousel {
  position: relative;
  width: 400px;
  height: 200px;
  overflow: hidden;
  border-radius: 12px;
}

.slides {
  display: flex;
  transition: transform 0.5s ease;
  width: 100%;
  height: 100%;
}

.slide {
  min-width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 24px;
}

.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0,0,0,0.4);
  color: white;
  border: none;
  cursor: pointer;
  padding: 8px 12px;
  font-size: 20px;
  border-radius: 4px;
}
.arrow.left { left: 10px; }
.arrow.right { right: 10px; }
.arrow:hover { background: rgba(0,0,0,0.6); }
</style>

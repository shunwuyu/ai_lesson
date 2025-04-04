<!-- src/App.vue -->
<template>
  <div class="app">
    <h1>Vue 3 图片懒加载示例</h1>
    <div class="image-container">
      <div v-for="image in images" :key="image.id" class="image-item">
        <img v-lazy="image.url" alt="懒加载图片" class="lazy-image" />
        <p>{{ image.title }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 图片数据
const images = ref([
  { 
    id: 1, 
    url: 'https://img.36krcdn.com/hsossms/20250403/v2_7e14dfd5cff9445c9f479c7323b5f9ac@000000_oswg229105oswg1536oswg722_img_000?x-oss-process=image/resize,m_mfit,w_960,h_400,limit_0/crop,w_960,h_400,g_center', 
    title: '图片 1' 
  },
  { 
    id: 2, 
    url: 'https://img.36krcdn.com/hsossms/20250402/v2_d9911ce44f6a4ce1a74b20fe320fdeaf@5951873_oswg169511oswg1053oswg495_img_jpg?x-oss-process=image/resize,m_mfit,w_600,h_400,limit_0/crop,w_600,h_400,g_center/format,webp', 
    title: '图片 2' 
  },
  { 
    id: 3, 
    url: 'https://img.36krcdn.com/hsossms/20250403/v2_9a61531949c446f98df367f278917131@000000_oswg273186oswg1536oswg722_img_000?x-oss-process=image/resize,m_mfit,w_600,h_400,limit_0/crop,w_600,h_400,g_center', 
    title: '图片 3' 
  },
  { 
    id: 4, 
    url: 'https://img.36krcdn.com/hsossms/20250404/v2_4d75328f1d264c939e7d142ca2187ff8@000000_oswg332145oswg1536oswg722_img_000?x-oss-process=image/resize,m_mfit,w_600,h_400,limit_0/crop,w_600,h_400,g_center', 
    title: '图片 4' 
  },
  { 
    id: 5, 
    url: 'https://img.36krcdn.com/hsossms/20250403/v2_292b7337cefa44ecb1cd5dcd231f3891@000000_oswg319526oswg1536oswg722_img_000?x-oss-process=image/resize,m_mfit,w_600,h_400,limit_0/crop,w_600,h_400,g_center',
    title: '图片 5' 
  },
  { 
    id: 6, 
    url: 'https://img.36krcdn.com/hsossms/20250312/v2_e40337acb9374ab0953dcfdb1debd0fd@1694_oswg692986oswg1053oswg495_img_png?x-oss-process=image/resize,m_mfit,w_600,h_400,limit_0/crop,w_600,h_400,g_center/format,webp', 
    title: '图片 6' 
  },
  { 
    id: 7, 
    url: 'https://picsum.photos/id/7/800/500', 
    title: '图片 7' 
  },
  { 
    id: 8, 
    url: 'https://picsum.photos/id/8/800/500', 
    title: '图片 8' 
  },
  { 
    id: 9, 
    url: 'https://picsum.photos/id/9/800/500', 
    title: '图片 9' 
  },
  { 
    id: 10, 
    url: 'https://picsum.photos/id/10/800/500', 
    title: '图片 10' 
  }
]);
</script>

<style>
.app {
  font-family: Arial, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.image-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.image-item {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.lazy-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  display: block;
  background-color: #f0f0f0;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.lazy-image.loaded {
  opacity: 1;
}

p {
  padding: 10px;
  margin: 0;
  text-align: center;
}
</style>
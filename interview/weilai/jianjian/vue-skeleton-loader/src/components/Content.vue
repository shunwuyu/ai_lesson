<!-- ParentComponent.vue -->
<template>
  <div class="container">
    <template v-if="isLoading">
      <SkeletonLoader />
    </template>
    <template v-else>
      <div v-for="item in items" :key="item.id" class="content-item">
        <img :src="item.avatar" class="avatar" alt="avatar">
        <div class="content">
          <h3>{{ item.title }}</h3>
          <p class="excerpt">{{ item.excerpt }}</p>
          <p class="meta">{{ item.date }}</p>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import SkeletonLoader from './SkeletonScreen.vue'

const isLoading = ref(true)
const items = ref([])

// 模拟数据加载
const fetchData = async () => {
  // 模拟 API 调用延迟
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  // 模拟真实数据
  items.value = [
    {
      id: 1,
      avatar: 'https://picsum.photos/40/40',
      title: '标题 1',
      excerpt: '这里是内容摘要，用于演示骨架屏加载效果...',
      date: '2023-08-15'
    },
    // 添加更多模拟数据...
  ]
  
  isLoading.value = false
}

onMounted(() => {
  fetchData()
})
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
}

.content-item {
  display: flex;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #eee;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 15px;
}

.content {
  flex: 1;
}

h3 {
  margin: 0 0 8px 0;
  font-size: 16px;
}

.excerpt {
  margin: 0 0 8px 0;
  color: #666;
  font-size: 14px;
}

.meta {
  margin: 0;
  color: #999;
  font-size: 12px;
}
</style>
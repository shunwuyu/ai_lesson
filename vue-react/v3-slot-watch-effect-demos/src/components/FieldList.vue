<template>
  <div>
    <input v-model="searchQuery" placeholder="搜索..." />
    <ul>
      <li v-for="item in filteredItems" :key="item.id">{{ item.name }}</li>
    </ul>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';

// 定义初始数据
const items = [
  { id: 1, name: '苹果' },
  { id: 2, name: '香蕉' },
  { id: 3, name: '橙子' },
  { id: 4, name: '葡萄' },
  { id: 5, name: '草莓' },
];

// 响应式搜索查询
const searchQuery = ref('');

// 计算过滤后的项目列表
const filteredItems = ref(items);

// 使用 watchEffect 实现实时过滤
watchEffect(() => {
  // 每当 searchQuery 发生变化时重新计算 filteredItems
  filteredItems.value = items.filter(item =>
    item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
</script>
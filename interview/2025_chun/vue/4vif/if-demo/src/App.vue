<template>
  <div>
    <button @click="active = 'A'">Tab A</button>
    <button @click="active = 'B'">Tab B</button>

    <!-- 使用 transition 包裹 -->
    <transition name="fade" mode="out-in">
      <div v-show="active === 'A'" key="A" class="tab-content">
        <h3>内容 A</h3>
        <p>这里是 A 页的内容。</p>
      </div>
    </transition>

    <transition name="fade" mode="out-in">
      <div v-show="active === 'B'" key="B" class="tab-content">
        <h3>内容 B</h3>
        <p>这里是 B 页的内容。</p>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const active = ref('A')
</script>

<style scoped>
.tab-content {
  transition: all 0.3s ease;
}

/* 定义 fade 动画 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>

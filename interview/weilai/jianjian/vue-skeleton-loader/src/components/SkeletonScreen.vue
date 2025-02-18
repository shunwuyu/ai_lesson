<!-- SkeletonLoader.vue -->
<template>
  <div class="skeleton-container">
    <div v-for="i in 5" :key="i" class="skeleton-item">
      <div class="skeleton-avatar"></div>
      <div class="skeleton-content">
        <div class="skeleton-line short"></div>
        <div class="skeleton-line medium"></div>
        <div class="skeleton-line long"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.skeleton-container {
  padding: 20px;
}

.skeleton-item {
  display: flex;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #eee;
}

.skeleton-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #f0f0f0;
  margin-right: 15px;
}

.skeleton-content {
  flex: 1;
}

.skeleton-line {
  height: 12px;
  background: #f0f0f0;
  margin-bottom: 8px;
  border-radius: 4px;
  animation: pulse 1.5s ease-in-out infinite;
}

.skeleton-line.short {
  width: 30%;
}

.skeleton-line.medium {
  width: 50%;
}

.skeleton-line.long {
  width: 80%;
}

@keyframes pulse {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    opacity: 1;
  }
}
</style>
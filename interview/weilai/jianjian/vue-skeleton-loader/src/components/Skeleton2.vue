<template>
  <div class="skeleton-screen">
    <div class="skeleton-block"></div>
    <div class="skeleton-block"></div>
    <div class="skeleton-block"></div>
  </div>
</template>

<script>
export default {
  name: 'SkeletonScreen',
};
</script>

<style scoped>
.skeleton-screen {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
}

.skeleton-block {
  width: 100%;
  height: 20px;
  background-color: #e0e0e0;
  border-radius: 4px;
  animation: shimmer 1.5s infinite;
}
.skeleton-block:nth-child(2) {
  height: 30px;
}

.skeleton-block:nth-child(3) {
  height: 40px;
}

@keyframes shimmer {
  0% {
    background-color: #e0e0e0;
  }
  50% {
    background-color: #f5f5f5;
  }
  100% {
    background-color: #e0e0e0;
  }
}
</style>
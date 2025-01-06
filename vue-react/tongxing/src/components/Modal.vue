<template>
  <div v-if="isVisible" class="modal-overlay">
    <div class="modal">
      <h2>我是弹窗</h2>
      <p>这是一个简单的弹窗示例。</p>
      <button @click="close">关闭</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { defineExpose } from 'vue';

const isVisible = ref(false);

// 定义方法来控制弹窗的显示和隐藏
const open = () => {
  isVisible.value = true;
};

const close = () => {
  isVisible.value = false;
};

// 暴露方法给父组件
defineExpose({
  open,
  close
});
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}
</style>
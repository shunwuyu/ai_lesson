<template>
  <div class="app">
    <h1>Vue Teleport 示例</h1>
    <p>这是主应用内容，模态框将渲染在DOM树的其他位置</p>
    <button @click="isModalOpen = true">打开模态框</button>
    
    <!-- 使用Teleport将内容传送到body -->
    <Teleport to="body">
      <div v-if="isModalOpen" class="modal-overlay">
        <div class="modal-content">
          <button class="modal-close" @click="isModalOpen = false">&times;</button>
          <div class="modal-body">
            <h2>这是一个模态框</h2>
            <p>
              虽然这个模态框在组件树中是App的子组件，
              但它实际上被渲染到了DOM树中的另一个位置，
              这就是Vue Teleport的魔力！
            </p>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isModalOpen: false
    }
  }
}
</script>

<style>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  max-width: 500px;
  width: 90%;
  position: relative;
}

.modal-close {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}

.modal-body {
  margin-top: 20px;
}
</style>
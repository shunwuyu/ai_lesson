<script setup>
</script>

<template>
  <div class="container">
    <div class="title">我很好</div>
    <button class="button">hello</button>
  </div>
</template>

<style scoped>
.container {
  width: 100%;       /* 撑满宽度 */
  min-height: 100vh;
  background: #f5f5f5;
  padding: 16px;
}

.title {
  font-size: 18px;   /* 写 px 即可，构建后自动转 vw */
  text-align: center;
  margin-bottom: 24px;
}

.button {
  width: 200px;      /* 自动转成 200/375*100 vw */
  height: 48px;
  line-height: 48px;
  background: #007aff;
  color: #fff;
  text-align: center;
  border-radius: 8px;
  margin: 0 auto;
}
</style>

<template>
  <div class="parent">
    <h2>这是父组件的标题</h2>
    <ChildComponent />
  </div>
</template>

<script setup>
import ChildComponent from './ChildComponent.vue';
</script>

<style scoped>
.parent h2 {
  color: blue;
}

/* 使用 >>> 操作符 */
.parent >>> .child p {
  color: red;
}

/* 或者使用 /deep/ 操作符 */
/* .parent /deep/ .child p {
  color: red;
} */
</style>
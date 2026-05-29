<template>
  <div>
    <button @click="toggle">切换显示</button>

    <!-- 方案 1 -->
    <p v-if="visible">这是 v-if 显示的内容</p>

    <!-- 方案 2 -->
    <p v-show="visible">这是 v-show 显示的内容</p>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const visible = ref(true);

    const toggle = () => {
      visible.value = !visible.value;
    };

    return { visible, toggle };
  }
};
</script>

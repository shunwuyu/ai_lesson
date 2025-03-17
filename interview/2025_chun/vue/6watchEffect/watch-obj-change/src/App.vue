<template>
  <div>
    <p>用户年龄: {{ user.age }}</p>
    <button @click="increaseAge">增加年龄</button>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, reactive, watch } from 'vue';

const user = reactive({
  name: '张三',
  age: 28
});

// 监听user对象中的age属性
watch(() => user.age, (newVal, oldVal) => {
  console.log(`年龄从 ${oldVal} 变为 ${newVal}`);
});

const increaseAge = () => {
  user.age += 1;
};

    
</script>
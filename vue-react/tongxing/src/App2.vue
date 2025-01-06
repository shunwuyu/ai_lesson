<script setup>
import { ref, reactive } from 'vue'

const counter = ref(0);
// 定义一个方法来更新counter的值
const increment = () => {
  counter.value++; // 需要通过 .value 访问和修改引用的值
};

const state = reactive({
  name: 'Alice',
  age: 25
});
// 定义一个方法来更新state中的值
const updateState = () => {
  state.name = 'Bob'; // 直接修改属性的值
  state.age++;
};
</script>

<template>
  <div>
    <p>Counter: {{ counter }}</p>
    <button @click="increment">Increment</button>

    <p>Name: {{ state.name }}</p>
    <p>Age: {{ state.age }}</p>
    <button @click="updateState">Update State</button>
  </div>
</template>

<style scoped>
</style>

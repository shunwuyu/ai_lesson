<template>
  <div class="counter">
    <h2>计数器</h2>
    <p>{{ counter.count }}</p>
    <div>
      <button @click="increment">增加</button>
      <button @click="decrement">减少</button>
    </div>
  </div>
</template>

<script setup>
import { useCounterStore } from '../stores/counter';

// 获取 Pinia store 实例
const counter = useCounterStore();

// 定义方法来调用 store 中的动作
const increment = () => counter.increment();
const decrement = () => counter.decrement();
</script>

<style scoped>
.counter {
  text-align: center;
  margin-top: 50px;
}

.counter h2 {
  font-size: 2em;
  margin-bottom: 20px;
}

.counter p {
  font-size: 1.5em;
  margin-bottom: 20px;
}

.counter button {
  padding: 10px 20px;
  margin: 0 10px;
  font-size: 1em;
  cursor: pointer;
}

.counter button:hover {
  background-color: #f0f0f0;
}
</style>
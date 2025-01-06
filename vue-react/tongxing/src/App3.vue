<template>
  <div>
    <h2>父组件</h2>
    <p>来自子组件的消息: {{ messageFromChild }}</p>
    <ChildComponent @child-message="handleChildMessage" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ChildComponent from './components/ChildComponent.vue';

// 创建一个响应式变量来接收来自子组件的消息
const messageFromChild = ref('');

// 定义处理子组件事件的方法
const handleChildMessage = (message) => {
  messageFromChild.value = message;
};
</script>
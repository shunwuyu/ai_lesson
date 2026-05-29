<template>
  <div>
    <h3>子组件</h3>
    <button @click="sendMessageToParent">发送消息给父组件</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { defineEmits } from 'vue';

// 定义自定义事件 emit
const emit = defineEmits(['child-message']);

// 创建一个响应式变量作为要发送的消息
const childMessage = ref('Hello, Parent!');

// 定义发送消息给父组件的方法
const sendMessageToParent = () => {
  emit('child-message', childMessage.value);
};
</script>
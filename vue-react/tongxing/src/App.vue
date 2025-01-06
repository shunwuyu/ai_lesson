<template>
  <div>
    <h2>父组件</h2>
    <button @click="openModal">打开弹窗</button>
    <Modal ref="modalRef" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Modal from './components/Modal.vue';

// 创建一个引用，用来指向子组件实例
const modalRef = ref(null);

// 定义方法来调用子组件的方法
const openModal = () => {
  if (modalRef.value) {
    modalRef.value.open();
  }
};
</script>
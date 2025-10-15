<template>
  <div>
    <p ref="msg">{{ text }}</p>
    <button @click="update">更新文字</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const text = ref('初始内容')
const msg = ref(null)

function update() {
  text.value = '更新后的内容'
  // 此时 DOM 还没更新
  console.log(msg.value.textContent) // 输出：初始内容 ❌
}
</script>

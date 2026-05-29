<template>
  <div>
    <p ref="msg">{{ text }}</p>
    <button @click="update">更新文字</button>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
const text = ref('初始内容')
const msg = ref(null)

async function update() {
  text.value = '更新后的内容'
  await nextTick() // 等待 DOM 更新完成
  console.log(msg.value.textContent) // 输出：更新后的内容 ✅
}
</script>

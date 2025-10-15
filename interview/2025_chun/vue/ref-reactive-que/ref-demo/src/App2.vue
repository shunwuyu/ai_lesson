<template>
  <div>
    <p>当前计数：{{ count }}</p>
    <button @click="add">+1</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const count = ref(0) // 基本类型 → 用 ref
function add() {
  count.value++ // 注意要通过 .value 修改
}
</script>

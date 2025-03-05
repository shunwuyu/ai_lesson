<template>
  <div>
    <AttrsChild :msg1="msg1" :msg2="msg2" title="3333"></AttrsChild>
  </div>
</template>

<script setup>
import AttrsChild from "./AttrsChild.vue"
import { ref, reactive } from "vue"
const msg1 = ref("1111")
const msg2 = ref("2222")
</script>

<style scoped>

</style>
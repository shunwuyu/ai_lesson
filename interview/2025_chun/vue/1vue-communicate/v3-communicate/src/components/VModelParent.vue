<template>
  <div> 
    <VModelChild v-model:key="key" v-model:value="value" />
  </div>
</template>
<script setup>
import VModelChild from "./VModelChild.vue"
import { ref, reactive } from "vue"
const key = ref("1111")
const value = ref("2222")
</script>
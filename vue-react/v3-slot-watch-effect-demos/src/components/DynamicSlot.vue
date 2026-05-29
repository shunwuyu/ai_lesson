<template>
  <div>
    <slot :name="slotName"></slot>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const slotName = ref('header')
</script>
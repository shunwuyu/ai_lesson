<template>
  <div>
    {{value}}
    <button @click="handlerClick">按钮</button>
  </div>
</template>

<script setup>
defineProps(["value"])
const emit = defineEmits(["value"])
const handlerClick = () => {
  emit("update:value", "新的value")
}
</script>

<style scoped>

</style>
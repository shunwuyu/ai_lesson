<template>
  <input 
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  >
</template>

<script setup lang="ts">
defineProps(['modelValue']);
defineEmits(['update:modelValue']);
</script>
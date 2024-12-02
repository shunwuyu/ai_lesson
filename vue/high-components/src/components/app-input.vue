<template>
    <input 
        type="text" 
        :value="modelValue"
        @input="updateModelValue"
    />
</template>
<script setup>
import { defineProps, defineEmits } from 'vue';
const props = defineProps({
    modelValue: String
})
const emits = defineEmits(['update:modelValue'])

const updateModelValue = (e) => {
    emits('update:modelValue', e.target.value)
}
</script>
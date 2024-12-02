<template>
    <button class="button">{{text}}</button>
</template>
<script setup>
import { defineProps } from 'vue';

defineProps({
    text: {
        type: String,
        default: '按钮'
    }
})

</script>
<style scoped>
.button {
    outline: none;
    border: none;
    border-radius: 3px;
    background: #e1e1e1;
    color: #5a5a5a;
    padding: 8px 16px;
    margin: 4px;
    cursor: pointer;
}
.button:active {
    opacity: 0.8;
}
</style>
<template>
    <button class="button" @click="tap">
        <slot></slot>
    </button>
</template>
<script setup>
import { defineProps, defineEmits, onMounted } from 'vue';

const props = defineProps({
    text: {
        type: String,
        default: '按钮'
    }
})

const emits = defineEmits(['tap', 'init'])
const tap = () => {
    emits('tap', props.text)
}
const init = () => {
    emits('init')
}

onMounted(() => {
    init();
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
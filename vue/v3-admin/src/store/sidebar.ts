import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSidebarStore = defineStore('sidebar', () => {
    const collapse = ref<boolean>(false)
    const handleCollapse = () => {
        collapse.value = !collapse.value
    }
    return {
        collapse,
        handleCollapse
    }
})
import { ref, onMounted } from 'vue'
export const useMouse = () => {
    const x = ref(0)
    const y = ref(0)
    const update = (event) => {
        x.value = event.pageX
        y.value = event.pageY
    }
    onMounted(() => {
        window.addEventListener('mousemove', update)
    })
    return {
        x, y
    }
}
import { ref, computed } from 'vue'


export const useTodos = () => {
    let title = ref("");
    let todos = ref([
        { title: '学习Vue', done: false }
    ])

    function addTodo() {
        todos.value.push({
            title: title.value,
            done: false
        })
        title.value = ""
    }

    function clear() {
        todos.value = todos.value.filter(v => !v.done)
    }

    let active = computed(() => {
        return todos.value.filter(v => !v.done).length;
    })

    let done = computed(() => todos.value.length);
    // computed 高级特性
    let allDone = computed({
        get: function() {
            return active.value === 0
        },
        set: function(value) {
            todos.value.forEach(todo => {
                todo.done = value
            })
        }
    })

    return {
        title,
        todos,
        addTodo,
        clear,
        active,
        done,
        allDone
    }
}
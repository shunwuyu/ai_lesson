<script setup lang="ts">
const name = ref('')
const content = ref('')

const reset = () => {
    name.value = ''
    content.value = ''
}

const createStartup = async () => {
    await $fetch('/api/playground/startups', {
        method: 'POST',
        body: {
            name: name.value,
            content: content.value
        },
        headers: {
        'Content-Type': 'application/json'
        }
    })
    reset()
}
</script>

<template>
<div style="padding:32px">
    <h1>Create Startup</h1>
    <form @submit.prevent="createStartup">
        <input type="text" v-model="name" placeholder="Name" />
        <br />
        <textarea v-model="content" placeholder="Content"></textarea>
        <br />
        <br>
        <button type="submit">Create</button>
    </form>
</div>
</template>
<script setup lang="ts">
import type { Startup } from '~/database/schema'

const list = ref<Startup[]>([])

const listStartups = async () => {
    const result = await $fetch<Startup[]>('/api/playground/startups');
    list.value = result
}

await listStartups()

const edit = ref<Startup | null>(null)

const updateStartup = async () => {
    await $fetch('/api/playground/startups', {
        method: 'PUT',
        body: edit.value
    })
    edit.value = null
}

const deleteStartup = async (id: string) => {
    await $fetch(`/api/playground/startups?id=${id}`, {
        method: 'DELETE',
        query: { id }
    })

    await listStartups()
}
</script>

<template>
    <div style="padding:32px">
        <h1>Startups</h1>
        <div v-for="item in list" :key="item.id">
            <h2>{{ item.name }}</h2>
            <p>{{ item.content }}</p>
            <button @click="edit = item">Edit</button>
            <br>
            <button @click="deleteStartup(item.id)">Delete</button>
        </div>
        <div v-if="edit">
            <h1>Edit</h1>
            <input type="text" v-model="edit.name" placeholder="Name" />
            <br>
            <br>
            <textarea v-model="edit.content" placeholder="Content"></textarea>
            <br>
            <br>
            <button @click="updateStartup">Update</button>
        </div>
    </div>
</template>
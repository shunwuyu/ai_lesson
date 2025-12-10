<script setup>
import { onMounted , ref} from 'vue'

const users = ref([]);

onMounted(() => {
  fetch('http://localhost:3000/users')
    .then(res => res.json())
    .then(data => {
      
      users.value = data
    })
})
</script>

<template>
  <div>
    <h1>Users</h1>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="user in users" :key="user.id">
                <td>{{ user.id }}</td>
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
            </tr>
        </tbody>
    </table>
  </div>
</template>

<style scoped>

</style>

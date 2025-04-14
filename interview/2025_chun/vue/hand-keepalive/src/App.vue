<template>
  <div>
    <button @click="current = 'ViewOne'">View One</button>
    <button @click="current = 'ViewTwo'">View Two</button>

    <MyKeepAlive :componentName="current" :componentsMap="components" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ViewOne from './ViewOne.vue'
import ViewTwo from './ViewTwo.vue'
import MyKeepAlive from './MyKeepAlive.vue'

const current = ref('ViewOne')
const components = {
  ViewOne,
  ViewTwo,
}
</script>

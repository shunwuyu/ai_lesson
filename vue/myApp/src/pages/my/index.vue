<template>
<div>
<nut-popup v-model:visible="showLoginCard" position="bottom" round :close-on-click-overlay="false" :closeable="false" :style="{ height: '70%' }">
    <login @afterLogin="afterLogin"></login>
</nut-popup>
</div>
</template>
<script setup>
import {ref, onBeforeMount, reactive} from 'vue';
import Login from "../login/login";
const showLoginCard = ref(true)
</script>
<style>
    
</style>
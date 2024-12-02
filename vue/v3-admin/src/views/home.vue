<template>
    <div class="wrapper">
        <v-header />
        <v-sidebar />
        <div class="content-box">
            <router-view />
        </div>
    </div>
</template>
<script lang="ts" setup>
import vHeader from '../components/header.vue'
import vSidebar from '../components/sidebar.vue'
</script>
<template>
    <div class="px-5">
        <h1 class="text-3xl font-bold pt-8 pb-4">推荐</h1>
        <Banner :per-page="3"/>
        <Personalized/>
    </div>
</template>

<script setup>
import Banner from "@/components/common/Banner.vue";
import Personalized from "@/views/discover/Personalized.vue";
</script>

<style scoped>
</style>
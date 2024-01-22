<template>
    <div >
        <Title title="你的专属歌单"/>
        <div class="grid grid-flow-row grid-cols-3 lg:grid-cols-5 gap-5 2xl:grid-cols-10">
            <div v-for="(item,index) in personalized" :key="index" :class="{'item-1':index===0}"
            @click="router.push({name:'playlist',query:{id:item.id}})">
            <CoverPlay :name="item.name" :pic-url="item.picUrl" :play-count="item.playCount" show-play-count/>
            <div class="mt-2 text-xs text-main truncate">{{ item.name }}</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Title from "@/components/common/Title.vue";
import { usePersonalized } from '@/utils/api.js';
import CoverPlay from "@/components/common/CoverPlay.vue";

const personalized = ref([])
onMounted(async () => {
    const result = await usePersonalized()
    personalized.value = result;

})

</script>

<style scoped>

</style>
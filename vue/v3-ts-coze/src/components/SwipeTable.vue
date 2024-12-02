<template>
    <div class="pt-4 h-full">
        <van-tabs swipeable>
            <van-tab v-for="(item, index) in list" :title="item">
                <div class="swipeContent">
                    <div v-show="index === 0">
                        <HotCar />
                        <van-divider>猜你喜欢</van-divider>
                        <Lists />
                    </div>
                    <div v-show="index !== 0"
                        class="mx-auto text-center h-screen text-[0.6rem] leading-[0.6rem] mt-[0.6rem]">
                        组件开发中..................</div>
                </div>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import HotCar from './HotCar.vue'
import Lists from './Lists.vue'

const list = ref([
    "推荐",
    "关注",
    "资讯",
    "独家",
    "原创",
    "玩车",
    "小视频",
    "节目",
    "改装",
    "提车作业",

]);
</script>

<style scoped></style>
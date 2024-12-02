<template>
  <div class="bg-white rounded-2xl p-4 h-full border-neutral-200 border">
    <!-- 标签 城市选择 -->

    <div class="cs flex overflow-hidden overflow-x-auto">
      <div
        v-for="(cityDiscount, index) in discountInfo"
        :key="index"
        :class="{ active: checked === index }"
        @click="checkedCity(index)"
        class="text-nowrap whitespace-nowrap p-1 pl-3 pr-3 m-1 border rounded-3xl"
      >
        {{ cityDiscount.region }}
      </div>
    </div>

    <!-- 倒计时 -->
    <div
      class="mt-3 mb-4 pt-1 pb-1 bg-[#fcf3de] text-[#ec9837] font-semibold rounded-lg flex justify-center items-center"
    >
      <van-icon name="underway" class="mr-2" />
      <van-count-down :time="time" format="距结束仅剩 DD 天 HH 时 mm 分" />
    </div>
    <TourItem :discounts="discountInfo[checked].discounts" :leftTime="leftTime" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import TourItem from "./TourItem.vue"
import { useDiscountStore } from "@/store/discountStore"

const discounts = useDiscountStore()
console.log(discounts, '////')
const discountInfo = ref(discounts.discountInfo)

// 倒计时
const leftTime = 6 * 24 * 60 * 60 * 1000
const time = ref(leftTime)

// 城市选择
// 选中的城市
let checked = ref(0)
// 选择城市
const checkedCity = (index: number) => {
  checked.value = index
}
</script>

<style scoped>
.active {
  @apply bg-[#ff5303] text-white font-semibold;
}
</style>
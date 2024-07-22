<template>
  <div class="p-2 pt-5" ref="section">
    <span class="font-semibold text-xl ml-2 mb-3">精选优惠</span>
    <div class="m-2 mt-7 border rounded-3xl relative bg-[#fee8bf] h-auto">
      <img
        src="../../assets/image/DiscountSection/year_end_sales_season.png"
        alt=""
        class="absolute w-28 right-0 -top-7"
      />
      <span class="block text-lg font-semibold m-3 mb-2">年末促销季</span>
      <span class="m-3 mt-0 text-sm/[22px] inline-block w-52">最高享50%折扣，PathPro独家优惠，把握机会！</span>
      <CityDiscount />
    </div>
  </div>
</template>

<script setup lang="ts">
import CityDiscount from "./CityDiscount.vue"

</script>

<style scoped></style>
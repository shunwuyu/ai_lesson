<template>
  <div class="item-warpper mt-2 mb-2" :class="{ flex: isflex }" :style="{ width }">
    <!-- 图片封面 -->
    <img
      :src="discount.cover"
      alt=""
      class="rounded-xl"
      :style="{
        width: widthimg,
      }"
    />
    <!-- 信息块 -->
    <div class="flex flex-col justify-center" :class="{ 'ml-2': isflex }" :style="{ width: widthimg }">
      <!-- Exclusive Discount -->
      <div v-if="Exclusive">
        <span
          class="text-white bg-[#ff5b00] w-5/12 h-6 whitespace-nowrap rounded-lg text-sm font-semibold pl-2 pr-2 pt-1 pb-1"
        >
          Exclusive Discount
        </span>
      </div>
      <!-- 城市信息 -->
      <span class="text-sm text-[#7d7d7d] mt-1" v-if="discount.city">{{ discount.city }}</span>
      <!-- 优惠信息标题 -->
      <span
        class="text-sm font-semibold w-11/12 overflow-hidden text-ellipsis"
        v-if="discount.title"
        :class="{ 'whitespace-nowrap': lines == 1, [`line-clamp-${lines}`]: lines != 1 }"
      >
        {{ discount.title }}
      </span>
      <!-- 评分与参与情况 -->
      <div class="text-sm flex-nowrap flex">
        <span class="text-[#f09b0a]" v-if="discount.rating"><van-icon name="star" />{{ discount.rating }}</span>
        <span
          class="text-[#9a9a9a] w-3/4 whitespace-nowrap overflow-hidden text-ellipsis"
          v-if="discount.evaluate || discount.participants"
        >
          <span v-if="discount.evaluate">({{ discount.evaluate }})</span
          ><span v-if="discount.evaluate && discount.participants">·</span
          ><span v-if="discount.participants"> {{ discount.participants }}+人参与 </span>
        </span>
      </div>
      <!-- 标签 -->
      <div class="flex mt-1 overflow-hidden flex-nowrap">
        <div
          class="mr-2 bg-[#f5f5f5] text-[#7d7d7d] pl-2 pr-2 rounded-xl text-xs flex items-center"
          v-for="(tag, index) in discount.tags"
          :key="index"
        >
          {{ tag }}
        </div>
      </div>
      <div>
        <!-- 价格 -->
        <span>￥{{ discount.price }}</span>
        <span class="text-sm ml-1">起</span>
      </div>
      <div class="overflew-hidden flex-nowrap whitespace-nowrap w-1/2">
        <!-- 打折信息 -->
        <span
          class="text-[#ff5b00] bg-[#fff0e5] text-xs text-center font-semibold rounded-lg mr-2 pl-2 pr-2 pt-1 pb-1"
          v-for="(discountMsg, index) in discount.discounts"
          :key="index"
        >
          {{ discountMsg }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface MsgItem {
  /** 优惠信息标题 */
  title?: string
  /** 封面 */
  cover?: string
  /** 评价人数 */
  evaluate?: number
  /** 评分 */
  rating?: number
  /** 参与人数 */
  participants?: string
  /** 城市 */
  city?: string
  /** 价格 */
  price?: number
  /** 打折信息 */
  discounts?: string[]
  /** 标签 */
  tags?: string[]
}

withDefaults(
  defineProps<{
    // 是否在一行
    isflex?: boolean
    // 多行省略
    lines?: number
    // 数据元
    discount: MsgItem
    // 整体宽度
    width?: string
    // 图片宽度
    widthimg?: string
    // Exclusive
    Exclusive?: boolean
  }>(),
  {
    isflex: false,
    lines: 1,
    width: "48%",
    widthimg: "100%",
    Exclusive: false,
  },
)
</script>

<style scoped></style>
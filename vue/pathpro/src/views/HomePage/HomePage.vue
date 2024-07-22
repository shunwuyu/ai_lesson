<template>
    <div class="home">
        <div class="top-bg absolute h-36 -z-10 w-screen bg-gradient-to-b from-orange-500 to-white"></div>
        <van-search
            v-model="searchField"
            placeholder="请输入搜索关键词"
            show-action
            shape="round"
            background="transparent"
            class="mb-2"
        >
        <template #action>
            <div class="text-white"><van-icon name="shopping-cart-o" size="1.25rem" /></div>
        </template>
        </van-search>
        <main class="flex flex-col">
            <header class="w-[calc(100vw-2rem)] min-h-24 bg-white rounded-2xl p-2 shadow-md self-center">
                <section class="topbar flex justify-around mb-3">
                    <div class="topbar-item flex flex-col items-center" v-for="item in topBarState" :key="item.title">
                        <div class="topbar-item__icon">
                        <van-icon :name="item.icon" size="2rem" />
                        </div>
                        <div class="topbar-item__text text-xs">{{ item.title }}</div>
                    </div>
                </section>
                <van-button type="primary" block size="small" class="[&.van-button]:rounded-xl" color="rgb(246,247,248)">
                    <div class="text-black flex">
                        <van-icon name="apps-o" size="1rem" />
                        <span class="text-xs ml-2 font-bold">所有分类</span>
                    </div>
                </van-button>
            </header>
            <section class="navbar flex overflow-x-scroll w-screen space-x-4 px-4">
                <div
                class="navbar-item flex flex-col border rounded-lg flex-[0_0_auto] w-24"
                v-for="item in navBarState"
                :key="item.title"
                >
                <div class="navbar-item__text text-xs p-2 pb-0">{{ item.title }}</div>
                <div class="navbar-item__icon self-end p-2">
                    <van-icon :name="item.icon" size="1.5rem" />
                </div>
                </div>
            </section>
            <section>
                <h2 class="title">最近浏览</h2>
                <RecentlyViewCard :items="recentlyViewedState" />
            </section>
            <section>
                <h2 class="title">想去哪里玩？</h2>
                <div class="flex w-screen overflow-x-scroll space-x-2 px-4">
                <div class="region-item flex-[0_0_auto]" v-for="item in discountInfo" :key="item.region">
                    <div class="item-wrapper w-32 h-20 rounded-lg overflow-hidden relative">
                    <img :src="item.discounts[0].cover" alt="" />
                    <div class="item-mask absolute w-full h-full bg-black opacity-20 bottom-0"></div>
                    <div class="item-title absolute z-10 text-sm font-bold text-white bottom-1 left-1">{{ item.region }}</div>
                    </div>
                </div>
                </div>
            </section>
            <section>
                <h2 class="title">探索更多</h2>
                <PromotionalList class="px-4" :items="promotionalList" :next="handleNextPage" />
            </section>
        </main>

    </div>
</template>
<script lang="ts" setup>
import { ref, toRefs, onMounted } from "vue"
import { useHomeStore } from "@/store/homeStore"
import { useDiscountStore } from "@/store/discountStore"
import RecentlyViewCard from "@/components/RecentlyView/RecentlyViewCard.vue"
import PromotionalList from "@/components/Promotional/PromotionalList.vue"
import { usePromotionalStore } from "@/store/promotionalStore"
const searchField = ref("")
const homeStore = useHomeStore()
const discountStore = useDiscountStore()
const promotionalStore = usePromotionalStore()

/*toRefs 是 Vue.js 组件 API 中的一个实用函数，主要
在组合式 API（Composition API）中使用。它的作用是将
一个响应式对象转换为包含多个响应式引用（ref）的对象。
const store = reactive({
  count: 0,
  message: 'Hello Vue!'
})

const { count, message } = toRefs(store)
*/
const { topBarState, navBarState, recentlyViewedState } = toRefs(homeStore)
const { discountInfo } = toRefs(discountStore)

onMounted(async () => {
  await promotionalStore.getPromotionalList(1, 6)
})

const currentPage = ref(1)

const handleNextPage = async (setHasMore: (value: boolean) => void) => {
  currentPage.value++
  const res = await promotionalStore.getPromotionalList(currentPage.value, 6)
  if (!res.hasMore) {
    setHasMore(false)
  }
}
const { promotionalList } = toRefs(promotionalStore)
</script>
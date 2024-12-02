<template>
    <div>
        <!-- 使用Transition组件包裹RouterView -->
        <transition name="route-fade">
            <router-view></router-view>
        </transition>
        <div class="footer h-5">
            <tabbar class="fixed bottom-0"></tabbar> <!-- 注意：将fiexd修正为fixed -->
        </div>
    </div>
</template>

<script setup lang="ts">
// 无需在script setup中添加任何代码
import Tabbar from '@/components/Tabbar.vue'
</script>

<style lang="less" scoped>
/* 定义过渡动画 */
.route-fade-enter-active,
.route-fade-leave-active {
    transition: all 0.3s ease;
    /* 过渡效果：所有属性0.3秒内完成，使用ease缓动函数 */
}

.route-fade-enter-from,
.route-fade-leave-to {
    transform: translateY(10px);
    /* 开始时元素向下偏移10px */
    opacity: 0;
    /* 开始时元素透明度为0 */
}
</style>
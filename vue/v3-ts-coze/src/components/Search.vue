<template>
    <div>
        <form action="/">
            <van-search v-model="value" show-action placeholder="请输入搜索关键词" @search="onSearch" action-text="搜索"
                @cancel="onCancel" @focus="show = true"
                class="fixed z-[101] h-4 w-full bg-gradient-to-b from-yellow-500 to-white" />
        </form>




        <van-overlay :show="show" @click="show = false" />

        <van-overlay />
    </div>
</template>

<script lang="ts" setup>
import { showSuccessToast } from 'vant';

import { ref } from 'vue'

const show = ref(false)
const value = ref('')

const onSearch = () => {
    showSuccessToast(value.value);
}
const onCancel = () => {
    showSuccessToast(value.value);
}

</script>

<style></style>
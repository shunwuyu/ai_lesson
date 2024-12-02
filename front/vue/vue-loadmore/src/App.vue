<script setup>
import { onMounted } from 'vue';
import BScroll from '@better-scroll/core'
import Pullup from '@better-scroll/pull-up'
BScroll.use(Pullup)

import { ref } from 'vue';
const data = ref(30);
const isPullUpLoad = ref(false);
const scroll = ref(null);
let bscroll;
onMounted(() => {
  bscroll = new BScroll(scroll.value, {
          pullUpLoad: true
  })

  bscroll.on('pullingUp', pullingUpHandler)
})
const pullingUpHandler = async () => {
  console.log('handler')
  isPullUpLoad.value = true
  await requestData()
  bscroll.finishPullUp()
  bscroll.refresh()
  isPullUpLoad.value = false
}
const requestData = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      data.value = parseInt(data.value) + 30;
      resolve();
    }, 2000)
  })
}
</script>

<template>
  <div class="pullup">
    <div ref="scroll" class="pullup-wrapper">
      <div class="pullup-content">
        <ul class="pullup-list">
          <li v-for="i of data" :key="i" class="pullup-list-item">
            {{ i % 5 === 0 ? 'scroll up 👆🏻' : `I am item ${i} `}}
          </li>
        </ul>
        <div class="pullup-tips">
          <div v-if="!isPullUpLoad" class="before-trigger">
            <span class="pullup-txt">Pull up and load more</span>
          </div>
          <div v-else class="after-trigger">
            <span class="pullup-txt">Loading...</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.pullup
  height: 100%
  .pullup-wrapper
    height: 100%
    padding: 0 10px
    border: 1px solid #ccc
    overflow: hidden
  .pullup-list
    padding: 0
  .pullup-list-item
    padding: 10px 0
    list-style: none
    border-bottom: 1px solid #ccc
  .pullup-tips
    padding: 20px
    text-align: center
    color: #999
</style>

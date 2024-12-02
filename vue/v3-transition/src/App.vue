<template>
  <div class="page">
    <div class="card">
      <div class="card__header">
        //这边演示的是bounce（弹）动画
        <h1 class="animate__animated animate__bounce">一个动画元素</h1>
        <h3 class="card-title">{{ name }}</h3>
        <div class="card-subtitle">Transition & Animation</div>
      </div>
      <div class="card__content">
        <!-- slide 后加-->
        <transition-group name="slide">
            <div class="emoji" v-for="emoji in emojiList" :key="emoji">
            {{ emoji }}
            </div>
        </transition-group>
      </div>
      
      <div class="card__action">
      <!--///-->
        <button type="button" @click="shuffle" :class="{active: isActive}">
          请按这里
        </button>
        <button type="button" @click="pop">
          请按这里
        </button>
      </div>
    </div>
    <div class="status">
        <small>isActive:{{isActive}}</small>
    </div>
  </div>
</template>
<script setup>
import _ from 'lodash'
import { ref, computed } from 'vue'
import 'animate.css'
import GhostEmoji from './components/ghost-emoji.vue'
import RobotEmoji from './components/robot-emoji.vue'

const name = "旅梦开发团"
const isActive = ref(true)
const emojiList = ref(['❤️', '💀', '🔥'])
const currentEmoji = computed(() => {
  return isActive.value ? (GhostEmoji)  : (RobotEmoji)
})
const toggleEmoji = () => {
  console.log('ddd')
  isActive.value = !isActive.value
}

const shuffle = () => {
    emojiList.value = _.shuffle(emojiList.value)
}

const pop = () => {
    emojiList.value.pop();
    console.log(emojiList.value)
}
</script>
<style scoped>
@import './styles/app.css';
@import './styles/card.css';
</style>

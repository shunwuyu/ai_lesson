<script setup>
</script>

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
       <!--
       <transition name="slide">
        <div v-if="isActive" class="emoji">🌳</div>
       </transition> 
       -->
       <!--
       <transition name="pulse">
        <div v-if="isActive" class="emoji">🌳</div>
       </transition>
       --> 
       <transition 
        name="animate__tada"
        enter-active-class="animate__animated animate__tada"
        leave-active-class="animate__animated animate__bounce"
        >
        <div v-if="isActive" class="emoji">🌳</div>
       </transition>
      </div>
      
      <div class="card__action">
      <!--///-->
        <button type="button" @click="toggleEmoji" :class="{active: isActive}">
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
import { ref } from 'vue'
import 'animate.css'
const name = "旅梦开发团"
const isActive = ref(true)
const toggleEmoji = () => {
  console.log('ddd')
  isActive.value = !isActive.value
}
</script>
<style scoped>
@import './styles/app.css';
@import './styles/card.css';
</style>

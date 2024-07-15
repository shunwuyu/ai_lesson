<script setup>
</script>

<template>
  <div class="page">
    <div class="card">
      <div class="card__header">
        <h3 class="card-title">{{ name }}</h3>
        <div class="card-subtitle">Transition & Animation</div>
      </div>
      <div class="card__content">
       <!--先切成transition  再 v-if 失效 再加效果  -->
       <!--
       <div :class="['emoji', {hidden: !isActive}]">🌳</div>
       -->
       <transition>
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

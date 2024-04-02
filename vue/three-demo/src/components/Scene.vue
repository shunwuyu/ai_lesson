<template>
  <div id="three"></div>
</template>
<script lang="ts" setup name="Sence">
import { ref, onMounted, type Ref } from 'vue';
import * as THREE from 'three';
import Viewer, { type Animate } from '@/modules/Viewer';

let viewer: Viewer;

onMounted(() => {
    init();
    initModel();
})

const init = () => {
  viewer = new Viewer('three');
}

const initModel = () => {
   
}
</script>
<style scoped>
#three {
  height: 100%;
  width: 100%;
}
</style>
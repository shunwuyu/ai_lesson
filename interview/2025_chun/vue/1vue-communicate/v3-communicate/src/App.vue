<template>
  <div>
    <ParentOne />
    <ParentTwo/>
    <EmitParent />
    <ExposeParent />
    <AttrsParent />
    <VModelParent />
    <ProvideParent />
    <MittA />
    <MittB />
  </div>
</template>

<script setup>
import ParentOne from './components/ParentOne.vue';
import ParentTwo from './components/ParentTwo.vue';
import EmitParent from './components/EmitParent.vue';
import ExposeParent from './components/ExposeParent.vue';
import AttrsParent from './components/AttrsParent.vue';
import VModelParent from './components/VModelParent.vue';
import ProvideParent from './components/ProvideParent.vue';
import MittA from './components/MittA.vue';
import MittB from './components/MittB.vue';
</script>

<style scoped>

</style>
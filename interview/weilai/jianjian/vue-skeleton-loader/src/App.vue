<template>
  <div>
    <Suspense>
      <template #default>
        <Content />
      </template>
      <template #fallback>
        <SkeletonScreen />
      </template>
    </Suspense>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import Content from './components/Content2.vue';
import SkeletonScreen from './components/Skeleton2.vue';

export default defineComponent({
  name: 'App',
  components: {
    Content,
    SkeletonScreen,
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
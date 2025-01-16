<script setup>
import BaseCard from './components/BaseCard.vue';
import Layout from './components/Layout.vue';
import UserList from './components/UserList.vue';
import DynamicSlot from './components/DynamicSlot.vue';
import WatchEffectExample from './components/WatchEffectExample.vue';
import WatchExample from './components/WatchExample.vue';
import FieldList from './components/FieldList.vue';

const dynamicSlotName = 'header';
</script>

<template>
  <div>
    <BaseCard>
      <p>这里是默认插槽的内容。</p>
    </BaseCard>
    <Layout>
      <template #header>
        <h1>这里是头部内容</h1>
      </template>

      <p>这里是主体内容。</p>

      <template #footer>
        <p>这里是底部内容</p>
      </template>
    </Layout>
    <UserList v-slot:default="{ user }">
      <p>{{ user.name }} {{ user.id }}</p>
    </UserList>
    <DynamicSlot :dynamic-slot-name="slotName">
      <template #[dynamicSlotName]>
        <p>这个内容是通过动态插槽名称插入的。</p>
      </template>
    </DynamicSlot>
    <WatchExample/>
    <WatchEffectExample/>
    <FieldList />
  </div>
</template>

<style scoped>

</style>

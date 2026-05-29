<template>
  <div class="h-screen flex">
    <div class="hidden md:block relative h-full">
      <div class="flex flex-col h-full bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transition-all duration-300"
        :class="isLeftPanelCollapsed ? 'w-16' : 'w-54'"
      >
        <div class="flex h-14 items-center p-4 border-b border-gray-200 dark:border-gray-700"
             :class="isLeftPanelCollapsed ? 'justify-center' : 'justify-start'">
          <div class="flex items-center min-w-0">
            <TheLogo class="w-8 h-8 flex-shrink-0" />
            <span v-if="!isLeftPanelCollapsed" class="ml-2 text-primary font-semibold text-lg truncate">
              {{ $config.public.appName }}
            </span>
          </div>
        </div>
        <nav class="flex-1 p-4 space-y-2">
         
        </nav>
      </div> 
    </div>
    <main class="flex-1 h-full overflow-scroll">
      <slot />
    </main>
  </div>
   
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const isLeftPanelCollapsed = ref(true);

const toggleLeftPanel = () => {
  isLeftPanelCollapsed.value = !isLeftPanelCollapsed.value
}

</script>
<style scoped>
/* Only keep styles that can't be handled by Tailwind */
@media (max-height: 400px) {
  .fixed {
    display: none;
  }
}
</style>
<template>
  <header class="sticky top-0 z-[1000] bg-background">
    <div class="px-4 sm:px-6 lg:px-16 mx-auto py-3">
      <div class="flex items-center">
        <div class="flex items-center flex-1">
          <CommonAppLogo class="h-8 w-auto mx-auto sm:mx-0 sm:h-10" />
        </div>
      </div>
    </div>
  </header>
</template>
<script lang="ts" setup>
import {
  ref 
} from 'vue';
const searchKey = ref('')
</script>
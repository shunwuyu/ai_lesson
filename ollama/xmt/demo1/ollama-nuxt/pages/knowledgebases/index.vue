<template>
    <div class="max-w-6xl mx-auto">
      <div class="flex items-center mb-4">
        <h2 class="font-bold text-xl mr-auto">{{ t("menu.knowledgeBases") }}</h2>
        <UButton icon="i-material-symbols-add"
                @click="onShowCreate">
          {{ t("global.create") }}
        </UButton>
      </div>
      <ClientOnly>
        
      </ClientOnly>
    </div>
</template>
<script lang="ts" setup>

const { t } = useI18n()
const modal = useModal()



</script>

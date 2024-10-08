<script setup lang="ts">
const { t } = useI18n()
const { loadModels, models } = useModels({ forceReload: true })
</script>
<template>
  <Download @modelDownloaded="loadModels" />
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { loadOllamaHost } from '../utils/settings'
import { Ollama } from 'ollama';

const ollama = new Ollama({ host: loadOllamaHost() });
// console.log(ollama)
const emit = defineEmits(["modelSelected"])
const selectedModel = ref(null);
const label = computed(() => selectedModel.value ? selectedModel.value : "Models");

const models = ref([]);

onMounted(async () => {
    const response = await ollama.list();
    // console.log(response)
    models.value = [
        response.models.map(m => {
            return {
                label: m.name,
                click: () => {
                    // console.log("Model selected: ", m.name);
                    selectedModel.value = m.name;
                    emit("modelSelected", m.name);
                }
            }
        })
    ];
})
</script>
<template>
  <ClientOnly>
    <UDropdown :items="models" :popper="{ placement: 'bottom-start' }">
      <UButton color="white" :label="label" trailing-icon="i-heroicons-chevron-down-20-solid" />
    </UDropdown>
  </ClientOnly>
</template>
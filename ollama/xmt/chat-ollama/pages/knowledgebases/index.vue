<script lang="ts" setup>
import { useStorage } from '@vueuse/core'
import { type KnowledgeBase } from '@prisma/client'
import { KnowledgeBaseForm } from '#components'
const { t } = useI18n()
// console.log(KnowledgeBaseForm,'////???')
const { token } = useAuth()
const router = useRouter()
const modal = useModal();
const createChatSession = useCreateChatSession()
const currentSessionId = useStorage<number>('currentSessionId', 0)

// console.log(modal.open(), '????')
// console.log(token.value, '///????')
const { data, refresh } = await useFetch('/api/knowledgebases', {
  headers: {
    // 非空断言操作符
    "Authorization": token.value!
  }
})

const columns = [
  { key: 'id', label: t('knowledgeBases.id') },
  { key: 'name', label: t('global.name') },
  { key: 'files', label: t('knowledgeBases.NoOfFiles') },
  { key: 'description', label: t('knowledgeBases.description') },
  { key: 'is_public', label: t('knowledgeBases.public') },
  { key: 'embedding', label: t('knowledgeBases.embedding') },
  { key: 'actions' }
]


const knowledgeBases = computed(() => data.value?.knowledgeBases || [])
const embeddings = computed(() => [...new Set(data.value?.knowledgeBases?.flatMap(el => el.embedding || []) || [])])

// console.log(knowledgeBases, '????//')

async function onStartChat(data: KnowledgeBase) {
  const chatSessionInfo = await createChatSession({ title: data.name, knowledgeBaseId: data.id })
  console.log(chatSessionInfo, '??????????')
  currentSessionId.value = chatSessionInfo.id
  router.push('/chat')
}
// console.log(token, '//////')
function onShowCreate() {
  // console.log('////?????')
  modal.open(KnowledgeBaseForm, {
    type: 'create',
    title: t('knowledgeBases.createTitle'),
    onClose: () => modal.close(),
    onSuccess: () => {
      console.log('hehe')
    }
  })
}
</script>
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
      <UTable :columns="columns" :rows="knowledgeBases" class="table-list" :empty-state="{ icon: 'i-heroicons-circle-stack-20-solid', label: t('global.noData') }">
        <template #name-data="{ row }">
          <ULink class="text-blue-600 dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-200 underline text-wrap text-left"
                 @click="onStartChat(row)">
            {{ row.name }}
          </ULink>
        </template>
      </UTable>
    </ClientOnly>
  </div>
</template>
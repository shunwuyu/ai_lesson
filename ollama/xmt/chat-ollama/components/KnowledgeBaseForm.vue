<template>
  <UModal prevent-close>
    <UCard>
      <template #header>
        <div class="flex items-center">
          <span class="mr-auto">{{ title }}</span>
          <UButton icon="i-material-symbols-close-rounded" color="gray" @click="onClose()"></UButton>
        </div>
      </template>
      <UForm ref="formRef" :state="state" :validate="validate" @submit="onSubmit">
        <UFormGroup :label="t('global.name')" name="name" required class="mb-4">
          <UInput type="text" v-model="state.name" autocomplete="off" />
        </UFormGroup>
        <UFormGroup :label="t('knowledgeBases.embedding')" name="embedding" :required="!isModify" class="mb-4">
          <div class="flex">
            <UDropdown v-model:open="showEmbeddingDropdown"
                       :items="embeddingList"
                       :ui="{ item: { disabled: 'pointer-events-none' }, width: 'w-auto' }"
                       :popper="{ placement: 'bottom-start' }">
              <div></div>
              <template #group="{ item }">
                <div>{{ item.label }}</div>
              </template>
            </UDropdown>
            <UInput v-model="state.embedding" class="grow" autocomplete="off" :placeholder="t('knowledgeBases.embeddingInputPlaceholder')" @focus="showEmbeddingDropdown = true" />
          </div>
        </UFormGroup>
        <UFormGroup :label="t('knowledgeBases.description')" name="description" class="mb-4">
          <UTextarea autoresize :maxrows="4" v-model="state.description" />
        </UFormGroup>
        <UFormGroup :label="t('knowledgeBases.publicAccessible')" name="public" class="mb-4">
          <p class="text-xs mb-2 text-pink-600 dark:text-pink-300">{{ t("knowledgeBases.publicAccessibleTip") }}</p>
          <UToggle v-model="state.isPublic" />
        </UFormGroup>
        <UDivider />

        <UTabs :items="tabs" class="pt-4">
          <template #files>
            <div class="pt-2 min-h-[200px]">
              <UFormGroup :label="t('knowledgeBases.filesAsKB')" name="file" class="mb-4">
                <FileSelector v-model="state.files" />
              </UFormGroup>
            </div>
          </template>

          <template #urls>
            <div class="pt-2">
              <UFormGroup :label="t('knowledgeBases.urlsAsKB')" name="urls" class="mb-4">
                <UTextarea v-model="state.urls" autoresize :maxrows="6" :placeholder="t('global.onePerLine')" />
              </UFormGroup>

              <UFormGroup :label="t('knowledgeBases.urlPageParser')" name="pageParser" class="mb-4">
                <USelectMenu v-model="state.pageParser" :options="parserList" value-attribute="value" />
              </UFormGroup>

              <UFormGroup :label="t('knowledgeBases.maxDepth')" name="maxDepth" class="mb-4">
                <div class="flex items-center">
                  <span class="text-primary mr-2 w-6">{{ state.maxDepth }}</span>
                  <URange v-model="state.maxDepth" :min="0" :max="3" :step="1" />
                </div>
              </UFormGroup>

              <UFormGroup name="excludeGlobs" class="mb-4">
                <template #label>
                  <div class="flex items-center">
                    <div>{{ t("knowledgeBases.excludeGlobs") }}</div>
                    <div class="text-muted mx-2" v-html="t('knowledgeBases.useTip')"></div>
                    <UPopover mode="hover" :popper="{ placement: 'top-end' }" class="block">
                      <div class="i-heroicons-information-circle-20-solid text-lg text-primary"></div>
                      <template #panel>
                        <div class="p-4">
                          <b>{{ t("knowledgeBases.examples") }}:</b>
                          <ul class="list-disc list-inside m-2">
                            <li>http://example.com/specify/url</li>
                            <li>http://example.com/foo*</li>
                            <li>http://example*</li>
                            <li>http://example*bar</li>
                            <li>http://example*foo*bar</li>
                          </ul>
                        </div>
                      </template>
                    </UPopover>
                  </div>
                </template>
                <UTextarea v-model="state.excludeGlobs" autoresize :maxrows="6" :placeholder="t('global.onePerLine')" />
              </UFormGroup>
            </div>
          </template>
        </UTabs>

        <div class="flex justify-end">
          <UButton color="gray" class="mr-2" @click="onClose()">{{ t("global.cancel") }}</UButton>
          <UButton type="submit" :loading="loading">
            {{ t("global.save") }}
          </UButton>
        </div>
      </UForm>
    </UCard>
  </UModal>
</template>
<script lang="ts" setup>
const { t } = useI18n()
const formRef = shallowRef()
const loading = ref(false)
const toast = useToast()

const props = defineProps<{
  title: string
  onClose: () => void
  onSuccess: () => void
}>()

const tabs = computed(() => {
  return [
    { label: t('global.files'), slot: 'files' },
    { label: t('knowledgeBases.URLs'), slot: 'urls' },
  ]
})

const isModify = computed(() => props.type === 'update')

const state = reactive({
  files: [] as File[],
  name: props.data?.name || '',
  embedding: props.data?.embedding || '',
  description: props.data?.description || '',
  isPublic: props.type === 'create' ? true : props.data?.is_public,
  urls: '',
  pageParser: 'default' as PageParser,
  maxDepth: 0,
  excludeGlobs: '',
})

function validate(data: typeof state) {
  const errors = []
  if (!data.name) errors.push({ path: 'name', message: t('global.required') })
  if (!data.embedding) errors.push({ path: 'embedding', message: t('global.required') })
  return errors
}

const showEmbeddingDropdown = ref(false)
const onSubmit = async () => {
  loading.value = true
  const formData = new FormData()
  state.files.forEach((file, index) => {
    formData.append(`file_${index}`, file)
  })
  // console.log(state)
  formData.append("name", state.name)
  formData.append("description", state.description)
  formData.append("isPublic", String(state.isPublic))
  formData.append("embedding", state.embedding)
  // formData.append("pageParser", state.pageParser)
  // formData.append("maxDepth", String(state.maxDepth))
  // formData.append("excludeGlobs", state.excludeGlobs)
  await submit(formData)
  loading.value = false
} 

async function submit(formData: FormData) {
  loading.value = true
  try {
    await $fetchWithAuth(
      `/api/knowledgebases/`,
      {
        method: 'POST',
        body: formData
      }
    )
    props.onSuccess()
    props.onClose()
  } catch (e: any) {
    console.log(e);
    //const msg = e.response._data?.message || e.message
    //toast.add({ color: 'red', title: 'Tips', description: msg })
  }
  loading.value = false
}

</script>
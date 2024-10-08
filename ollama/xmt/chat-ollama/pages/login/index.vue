<script setup lang="ts">
// yup 是一个用于 JavaScript 对象模式验证的库，提供链式、
// 声明式的对象模式描述和验证功能。
import { object, string } from 'yup'
import { reactive, ref } from 'vue'

const { signIn } = useAuth()
const toast = useToast()
console.log(toast)

const loading = ref(false)

const { t } = useI18n()
const state = reactive({
  name: undefined,
  password: undefined
})

const schema = object({
  name: string().min(1, t("auth.nameRule1")).required(t('global.required')),
  password: string().min(6, t('auth.passwordRule1')).required(t('global.required'))
})

const onSubmit = async () => {
  loading.value = true
  try {
    await signIn({
      username: state.name,
      password: state.password
    }, {
      callbackUrl: '/'
    })
  } catch (error: any) {
    toast.add({
      title: t('auth.failedLoginTitle'),
      description: error?.statusMessage || error,
      color: 'red'
    })
  }
  loading.value = false
}
</script>
<template>
  <ClientOnly>
    <UCard class="w-[400px] mx-auto">
      <template #header>
        <h1 class="font-bold text-2xl text-center">{{ t("auth.signIn") }}</h1>
      </template>
      <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormGroup :label="t('global.name')" name="name">
          <UInput v-model="state.name" />
        </UFormGroup>
        <UFormGroup :label="t('global.password')" name="password">
          <UInput v-model="state.password" type="password" />
        </UFormGroup>
        <div class="pt-4">
          <UButton size="lg" class="block w-full" type="submit" :loading="loading">{{ t("global.continue") }}</UButton>
        </div>
        <div class="text-sm">
          <span>{{ t('auth.noAccount') }}</span>
          <UButton to="/signup" variant="link">{{ t('auth.signUp') }}</UButton>
        </div>
      </UForm>
    </UCard>
  </ClientOnly>
</template>
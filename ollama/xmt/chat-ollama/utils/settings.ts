import { useStorage } from '@vueuse/core'

function getLocalValue(key: string) {
  return process.server ? '' : (localStorage.getItem(key) || '')
}

export const DEFAULT_KEYS_STORE: ContextKeys = {
  ollama: {
    endpoint: getLocalValue('ollama.host'),
    username: getLocalValue('ollama.username'),
    password: getLocalValue('ollama.password'),
  },
  openai: {
    key: getLocalValue('keys.openai_api_key'),
    endpoint: getLocalValue('keys.openai_api_host'),
    proxy: false,
  },
  azureOpenai: {
    key: getLocalValue('keys.azure_openai_api_key'),
    endpoint: getLocalValue('keys.azure_openai_endpoint'),
    deploymentName: getLocalValue('keys.azure_openai_deployment_name'),
    proxy: false,
  },
  anthropic: {
    key: getLocalValue('keys.anthropic_api_key'),
    endpoint: getLocalValue('keys.anthropic_api_host'),
    proxy: false,
  },
  moonshot: {
    key: getLocalValue('keys.moonshot_api_key'),
    endpoint: getLocalValue('keys.moonshot_api_host'),
  },
  gemini: {
    key: getLocalValue('keys.gemini_api_key'),
    proxy: false,
    endpoint: '',
  },
  groq: {
    key: getLocalValue('keys.groq_api_key'),
    endpoint: getLocalValue('keys.groq_api_host'),
    proxy: false,
  },
  custom: []
}

export const keysStore = useStorage<ContextKeys>('keys', DEFAULT_KEYS_STORE)
export const getKeysHeader = () => ({ 'x-chat-ollama-keys': encodeURIComponent(JSON.stringify(keysStore.value)) })

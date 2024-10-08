// 从哪里排出
interface ChatSessionBaseData extends Omit<ChatSession, 'id'> { }

export function useCreateChatSession() {
  const { chatModels, loadModels } = useModels({ immediate: false })
  // console.log(chatModels, loadModels, '?????')
  const { t } = useI18n()
  const toast = useToast()
  // console.log(toast, '????')

  return async function createChatSession(params?: Partial<Omit<ChatSessionBaseData, 'attachedMessagesCount' | 'createTime' | 'updateTime'>>) {
    const baseData: ChatSessionBaseData = {
      createTime: Date.now(),
      updateTime: Date.now(),
      title: params?.title || '',
      models: params?.models || chatDefaultSettings.value.models,
      instructionId: params?.instructionId || 0,
      knowledgeBaseId: params?.knowledgeBaseId || 0,
      attachedMessagesCount: chatDefaultSettings.value.attachedMessagesCount,
      isTop: 0,
    }
    // console.log(baseData,'------')
    // set default model
    await loadModels()
    if (chatModels.value.length === 0) {
      toast.add({ title: t('chat.noModelFound'), description: t('chat.noModelFoundDesc'), color: 'red' })
    } else {
      const availableModels = baseData.models.filter(m => chatModels.value.some(cm => cm.value === m))
      baseData.models = availableModels
    }

    // console.log(baseData, '//////')

    const id = await clientDB.chatSessions.add(baseData)
    console.log(id);
    return { ...baseData, id, count: 0 }
  }
}

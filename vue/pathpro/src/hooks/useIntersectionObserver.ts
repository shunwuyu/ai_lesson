import { Ref, onUnmounted, ref, watch } from "vue"

// 用于监听滚动到底部
const useIntersectionObserver = (NodeRef: Ref<HTMLElement | null>, loadMore: () => void) => {
  // 是否有下一页
  const hasMore = ref(true)
  // 用于监听节点
  let observer: IntersectionObserver
  // 监听节点变化
  watch(NodeRef, (newNodeRef, oldNodeRef) => {
    // 取消监听旧节点
    if (oldNodeRef) {
      observer.unobserve(oldNodeRef)
    }
    // 监听新节点
    if (newNodeRef) {
      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          // 该节点出现在视图中时触发回调，加载更多
          loadMore()
        }
      })
      observer.observe(newNodeRef)
    }
  })
  // 组件卸载时，取消监听
  onUnmounted(() => {
    observer.disconnect()
  })
  // 监听hasMore变化，如果有下一页，则继续监听，否则取消监听
  watch(hasMore, (value) => {
    value ? observer.observe(NodeRef.value!) : observer.disconnect()
  })

  return {
    hasMore,
    setHasMore: (value: boolean) => {
      hasMore.value = value
    },
  }
}

export default useIntersectionObserver
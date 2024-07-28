<script setup lang="ts">
import { ref, onMounted, toRefs } from 'vue'
import {useArticleStore } from './store/article.ts'
import  useIntersectionObserver  from './hooks/useIntersectionObserver.ts'
const articleStore = useArticleStore()
onMounted(async () => {
  await articleStore.getArticles(1)
})
const { articles } = toRefs(articleStore)

const itemRef = ref<HTMLElement | null>(null);
let hasMore = ref<boolean>(true);
// 定义当前的页数，初始值为1
const currentPage = ref<number>(1);

// 处理加载下一页
const handleNextPage = async (setHasMore:(value:boolean) => void) =>{
  currentPage.value++;
  const res = await articleStore.getArticles(currentPage.value);
  if(!res.hasMore){
    setHasMore(false);
    hasMore.value = false;
  }
}

const { setHasMore } = useIntersectionObserver(itemRef, ()=>{
  handleNextPage(setHasMore);
})



</script>

<template>
  <section>
    <article 
      class="item" 
      v-for="(item,index) in articles" 
      :key="item.id"
      :ref="(el)=>(index === articles.length-1 ? (itemRef = el as HTMLElement) : '')"
    >
        <div >{{item.title}}</div>
    </article>
    <div v-if="!hasMore">
      <div>没有数据了</div>
    </div>
  </section>
</template>

<style scoped>
.item{
  height: 20vh;

}
</style>

<template>
    <el-popover popper-style="max-width:auto;padding:0;" v-model:visible="showSearchView" width="250px">
        <template #reference>
            <ElInput placeholder="搜索音乐、MV、歌单"
            :prefix-icon="Search"
            clearable
            v-model="searchKeyword"
            @input="searchInput"
            @focus="showSearchView=true"
            @focusout="showSearchView=false"
            />
        </template>
        <div class="h-96">
            <el-scrollbar>
                <div class="pb-2.5">
                    <div v-if="showHot">
                        <div class="pt-2 pb-1.5 px-2.5">热门搜索</div>
                        <div>
                            <div v-for="(item,index) in searchHot" :key="item.searchWord"
                                class="py-2.5 px-2.5 hover-text cursor-pointer flex justify-between items-center text-xs">
                            <div>
                            <span class="mr-1">{{ index + 1 }}.</span>
                            <span>{{ item.searchWord }}</span>
                        </div>
                        <div class="text-red-300 text-xs">{{ item.score }}</div>
                    </div>
                    </div>
                </div>
                <SearchSuggest v-else/>
                </div>
            </el-scrollbar>
        </div>
            
    </el-popover>
</template>

<script setup>
import {useSearchHotDetail, useSearchSuggest} from "@/utils/api";
import { ref, onMounted } from 'vue'
import {debounce} from 'lodash'
import SearchSuggest from "@/components/layout/header/SearchSuggest.vue";

const  searchKeyword = ref('')
const showHot = ref(true)
const searchInput = debounce((value) => suggest(), 500, {'maxWait': 1000})
const suggest = async () => {
    console.log(await useSearchSuggest(searchKeyword.value))
}
const showSearchView = ref(false) 
const searchHot = ref([])  
onMounted(async () => {
    // console.log('ddd')
    searchHot.value = await useSearchHotDetail()
})
</script>

<style  scoped>

</style>
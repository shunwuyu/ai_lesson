<template>
	<div>
        <div class="container">
            <el-table class="mgb20" :style="{ width: '100%' }" border :data="tableData"
            @selection-change="handleSelectionChange" table-layout="auto">
                <template v-for="item in columns" :key="item.prop">
                    <el-table-column :prop="item.prop" :label="item.prop">
                    </el-table-column>
                </template>
            </el-table>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted  } from 'vue'
import { fetchData } from '../../api/index.js'

let columns = ref([
	{ prop: 'id', label: '序号', width: 55, align: 'center' },
	{ prop: 'name', label: '用户名' },
	{ prop: 'money', label: '账户余额' },
	{ prop: 'thumb', label: '头像' },
	{ prop: 'state', label: '账户状态' },
])

const tableData = ref([])
const handleSelectionChange = () => {

}

onMounted(async () => {
    const data = await fetchData()
    console.log(data)
    tableData.value = data.list
})


</script>
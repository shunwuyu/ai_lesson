<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="date" label="Date" width="180" />
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="address" label="Address" />
  </el-table>
  <button @click="refresh">refresh</button>
  <!-- 分页器 -->
  <el-pagination
    v-model:current-page="pagination.current"
    :page-size="pagination.size"
    layout="total, prev, pager, next"
    :page-sizes="pagination.sizeOption"
    :total="pagination.total"
    @size-change="pagination.onSizeChange"
    @current-change="pagination.onCurrentChange"
  />
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { getTableDataApi } from "./api.js";
import { useTable } from './useTable.js'

const [tableData, refresh, pagination] = useTable(getTableDataApi);

onMounted(refresh);
</script>
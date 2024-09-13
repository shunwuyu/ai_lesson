<template>
  <teleport
    :disabled="!appendToBody"
    to="body"
  >
    <div class="el-dialog">
      <div class="el-dialog__content">
        <slot />
      </div>
    </div>
  </teleport>
</template>
<script setup lang="ts">
//Teleport 是 Vue 3 中的一个内置组件，用于将子组件渲染到 DOM 树中的另一个位置。
import { withDefaults } from 'vue'

withDefaults(defineProps<{
    appendToBody?:boolean,
}>(),{
  appendToBody:true
})
</script>

<script lang="ts">
export default{
  name:'ElDialog'
}
</script>
<style>
    .el-dialog{
        position: fixed;
        width: 100%;
  top: 0; right: 0; bottom: 0; left: 0;

display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(0,0,0,.5);

    }
    .el-dialog__content{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: white;
      width: 800px;
      height: 400px;
      padding: 5px;
    }
    iframe{
      width:600px;
      height:300px;
    }
</style>
<template>
  <div>
    子组件
  </div>
</template>

<script setup>
defineExpose({
  childName: "这是子组件的属性",
  someMethod(){
      console.log("这是子组件的方法")
  }
})
</script>

<style  scoped>

</style>
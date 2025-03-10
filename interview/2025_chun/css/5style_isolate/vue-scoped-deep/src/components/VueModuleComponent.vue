<template>
  <!-- CSS Modules 是一种更强大的样式隔离方案，它通过编译时生成唯一的类名来实现样式隔离。 -->
  <div :class="$style.example">
    <p :class="$style.text">这是一个带有 CSS Modules 样式的示例</p>
  </div>
</template>

<script setup>

</script>

<style module>
example {
  background-color: lightblue;
}

.text {
  color: red;
}
</style>
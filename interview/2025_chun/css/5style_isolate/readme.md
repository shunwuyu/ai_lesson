样式隔离（Style Isolation）是指在组件化开发中，确保每个组件的样式不会影响其他组件，避免全局样式冲突。

- Vue 中的样式隔离
  1. 单文件组件 (SFC) 中的 scoped CSS
  Vue 的单文件组件（Single File Component, SFC）支持 scoped 属性，可以将样式限制在当前组件内。
  属性选择器：Vue 编译器会为每个组件中的元素添加一个唯一的属性（如 data-v-f3f3eg9），并在样式中使用该属性进行选择。
  ```
  <div class="example" data-v-f3f3eg9>
    <p data-v-f3f3eg9>这是一个带有 scoped 样式的示例</p>
  </div>
  .example p[data-v-f3f3eg9] {
    color: red;
  }

  深层选择器 (>>> 或 /deep/)：如果需要穿透到子组件的样式，可以使用 >>> 或 /deep/ 操作符。
  /* 使用 >>> */
.example >>> .child-component {
  color: blue;
}

/* 使用 /deep/ */
.example /deep/ .child-component {
  color: blue;
}
  ```

2. CSS Modules
CSS Modules 是一种更强大的样式隔离方案，它通过编译时生成唯一的类名来实现样式隔离。
<template>
  <div :class="$style.example">
    <p :class="$style.text">这是一个带有 CSS Modules 样式的示例</p>
  </div>
</template>

<script>
export default {
  name: 'ExampleComponent'
}
</script>

<style module>
.example {
  background-color: lightblue;
}

.text {
  color: red;
}
</style>

<div class="_example_abc123">
  <p class="_text_def456">这是一个带有 CSS Modules 样式的示例</p>
</div>

._example_abc123 {
  background-color: lightblue;
}

._text_def456 {
  color: red;
}

- React 中的样式隔离
CSS-in-JS 库（如 styled-components、emotion）

import React from 'react';
import styled from 'styled-components';

const ExampleComponent = () => {
  return (
    <StyledExample>
      <p>这是一个带有 styled-components 样式的示例</p>
    </StyledExample>
  );
};

const StyledExample = styled.div`
  background-color: lightblue;

  p {
    color: red;
  }
`;

export default ExampleComponent;

CSS Modules



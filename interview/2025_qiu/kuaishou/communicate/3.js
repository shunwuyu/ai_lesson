<template>
  <div>
    <h2>祖组件</h2>
    <ParentComponent />
  </div>
</template>

<script>
import { provide } from 'vue';
import ParentComponent from './ParentComponent.vue';

export default {
  components: { ParentComponent },
  setup() {
    provide('globalMessage', 'Hello from Grandparent');
  }
};
</script>


<template>
  <div>
    <h3>父组件 (ParentComponent)</h3>
    <!-- 可以在父组件展示消息，也可以直接包含孙组件 -->
    <p>父组件不直接传递消息</p>
    <GrandchildComponent />
  </div>
</template>

<script>
import GrandchildComponent from './GrandchildComponent.vue';

export default {
  components: { GrandchildComponent },
  setup() {
    // 这里父组件不需要提供或注入消息
    return {};
  }
};
</script>


<template>
  <p>孙组件接收到跨级消息: {{ msg }}</p>
</template>

<script>
import { inject } from 'vue';
export default {
  setup() {
    const msg = inject('globalMessage');
    return { msg };
  }
};
</script>

<template>
  <div>
    <h2>父组件控制兄弟组件通信</h2>
    <SiblingA @sendMessage="message = $event" />
    <SiblingB :msg="message" />
  </div>
</template>

<script>
import { ref } from 'vue';
import SiblingA from './SiblingA.vue';
import SiblingB from './SiblingB.vue';

export default {
  components: { SiblingA, SiblingB },
  setup() {
    const message = ref('');
    return { message };
  }
};
</script>


<template>
  <button @click="$emit('sendMessage', 'Hello from SiblingA')">
    发送消息给兄弟
  </button>
</template>

<script>
export default {};
</script>


<template>
  <p>接收到兄弟消息: {{ msg }}</p>
</template>

<script>
export default {
  props: ['msg']
};
</script>



<template>
  <div>
    <h2>父组件</h2>
    <p>父组件的消息: {{ parentMessage }}</p>
    <ChildComponent :msg="parentMessage" @childEvent="handleChildEvent" />
  </div>
</template>

<script>
import { ref } from 'vue';
import ChildComponent from './ChildComponent.vue';

export default {
  components: { ChildComponent },
  setup() {
    const parentMessage = ref('Hello from Parent');

    const handleChildEvent = (data) => {
      console.log('收到子组件消息:', data);
    };

    return { parentMessage, handleChildEvent };
  }
};
</script>


<template>
  <div>
    <h3>子组件</h3>
    <p>接收到父组件消息: {{ msg }}</p>
    <button @click="sendToParent">发送消息给父组件</button>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    msg: String
  },
  setup(props, { emit }) {
    const sendToParent = () => {
      emit('childEvent', 'Hello from Child');
    };

    return { sendToParent };
  }
});
</script>

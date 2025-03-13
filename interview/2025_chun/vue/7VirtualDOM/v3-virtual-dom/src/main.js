import { createApp, h } from 'vue';

const vnode = h('div', { id: 'app' }, 'Hello Vue 3');

createApp({
  render() {
    return vnode;
  }
}).mount('#app');
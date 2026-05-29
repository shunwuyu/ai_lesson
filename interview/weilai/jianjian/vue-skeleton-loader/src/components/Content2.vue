<template>
  <div class="content">
    <h1>{{ title }}</h1>
    <p>{{ description }}</p>
    <img :src="imageUrl" alt="Sample Image" />
  </div>
</template>

<script>
import { ref } from 'vue';

// 模拟异步数据获取
const fetchData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        title: '欢迎来到我的网站',
        description: '这是一个使用 Vue 3 和 Composition API 的骨架屏示例。',
        imageUrl: 'https://via.placeholder.com/600x300',
      });
    }, 100000);
  });
};

export default {
  name: 'Content',
  async setup() {
    const title = ref('');
    const description = ref('');
    const imageUrl = ref('');

    // 异步获取数据
    const data = await fetchData();
    title.value = data.title;
    description.value = data.description;
    imageUrl.value = data.imageUrl;

    return {
      title,
      description,
      imageUrl,
    };
  },
};
</script>

<style scoped>
.content {
  padding: 16px;
}

img {
  max-width: 100%;
  height: auto;
}
</style>
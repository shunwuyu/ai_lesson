<template>
  <div>
    <Head>
      <Title>{{ post?.title }}</Title>
    </Head>

    <h1>{{ post?.title }}</h1>
    <div>{{ post?.content }}</div>
    <div>- {{ post?.user.name }}</div>
  </div>
</template>

<script setup lang="ts">
import { Post } from '../../types/post.type';

const {
  params: { id },
} = useRoute();


const { data: post } = await useApiFetch<Post>(`posts/${id}`);

if (!post.value) {
  showError({ statusCode: 404, message: '没找到内容页面。' });
}
</script>
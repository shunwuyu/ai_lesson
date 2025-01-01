<template>
  <div>
    <h1>头像生成</h1>
    <input type="text" v-model="name" placeholder="请输入名称">
    <button @click="generate">生成头像</button>
    <div v-if="img">
      <img :src="img" />
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import axios from 'axios'

let name = ref('')
const img = ref('')

const ApiKey='pat_qTnjhZ8ZZEargL1uUkUVx0VzRCE3g7YFjZvBqGIc2CFxx8ZSqFnKulE0rn1HUHSV'
const url='https://api.coze.cn/v3/chat'

// 构建请求体
const body = {
  bot_id: "7452907769226739722",
  user_id: "123",
  additional_messages: [
    { "role": "user", "content_type":"text", "content": name.value || '天线宝宝' }
  ],
  stream: false,
};

// 配置axios请求
const config = {
  method: 'post',
  url: url,
  headers: {
    'Authorization': `Bearer ${ApiKey}`,
    'Content-Type': 'application/json',
    'Connection': 'keep-alive',
    'Accept': '*/*'
  },
  data: body
};

function generate () {
  axios(config)
      .then(res => {
        img.value=JSON.parse(res.data.messages[1].content).data.image_url
      })
      .catch(error => {
        console.error('请求失败：', error);
      });
}
</script>

<style lang="css" scoped>

</style>

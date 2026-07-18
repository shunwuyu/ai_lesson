<script setup>
import { ref } from 'vue';

const prompt = ref('A lovely rabbit');
const imgUrl = ref('');

const generateImage = async () => {
  imgUrl.value = 'https://cdnjs.cloudflare.com/ajax/libs/file-uploader/5.16.2/azure.jquery.fine-uploader/continue.gif';
  
  // “千万别给我画这些”的黑名单
  // 你去餐厅点菜（prompt），说“给我来盘鱼香肉丝”，
  // ’同时特意补一句“千万别放香菜、别太咸、别炒糊”
  // 图片是像素级的连续空间，约束弱
  const negativeWords = 'Blurry, Bad, Bad anatomy, Bad proportions, Deformed, Disconnected limbs, Disfigured, Extra arms, Extra limbs, Extra hands, Fused fingers, Gross proportions, Long neck, Malformed limbs, Mutated, Mutated hands, Mutated limbs, Missing arms, Missing fingers, Poorly drawn hands, Poorly drawn face.';

  const endpoint = '/api/v1/images/generations';

  const payload = {
    model_name: 'kling-v2-1',
    prompt: prompt.value,
    negative_prompt: negativeWords,
    aspect_ratio: '1:1',
  };

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${import.meta.env.VITE_ACCESS_KEY_SECRET}`,
  };

  const res = await fetch(endpoint, {
    headers,
    method: 'POST',
    body: JSON.stringify(payload),
  });

  if (res.status >= 400) {
    throw new Error(`Non-200 response: ${await res.text()}`);
  }

  const ret = await res.json();
  console.log(JSON.stringify(ret));
  const id = ret.data.task_id;
  console.log(id)
  const resultUrl = `${endpoint}/${id}`;
  console.log(resultUrl)
  do {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const result = await fetch(resultUrl, {
      headers,
    });
    const resultJson = await result.json();
    const taskStatus = resultJson.data.task_status;
    if (taskStatus === 'processing' || taskStatus === 'submitted') {
      continue;
    }
    if (taskStatus === 'failed') {
      throw new Error(`Task failed: ${JSON.stringify(resultJson)}`);
    }
    const sample = resultJson.data?.task_result;
    if (sample) {
      imgUrl.value = sample.images[0].url;
    } else {
      imgUrl.value = 'https://res.bearbobo.com/resource/upload/vNg4ALJv/6659895-ox36cbkajrr.png';
    }
    break;
  } while (1);
};
</script>

<template>
  <div class="container">
    <div>
      <label>Prompt </label>
      <button @click="generateImage">Generate</button>
      <textarea class="input" type="text" v-model="prompt" />
    </div>
    <div class="output">
      <img :src="imgUrl" />
    </div>
  </div>
</template>

<style scoped>
.input {
  width: 100%;
  height: 2rem;
  font-size: 1rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
}
.progress {
  width: 100%;
  height: 0.1rem;
  margin: .4rem 0;
  background: #ccc;
}
.progress > div {
  background: #c00;
  height: 100%;
}
.container {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  height: 100vh;
}
.output {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  border: 1px solid #ccc;
}
.output > img {
  width: 300px;
}
</style>
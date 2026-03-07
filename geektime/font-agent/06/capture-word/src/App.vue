<script setup lang="ts">
import { generateAudio } from './lib/audio.ts';
import { ref } from 'vue';
import PictureCard from './components/PictureCard.vue';

const word = ref('请上传图片');
const audio = ref('');
const sentence = ref('');

const detailExpand = ref(false);
const imgPreview = ref('');

const explainations = ref([]);
const expReply = ref([]);

const userPrompt = `
分析图片内容，找出最能描述图片的一个英文单词，尽量选择更简单的A1~A2的词汇。

返回JSON数据：
{
  "image_discription": "图片描述",
  "representative_word": "图片代表的英文单词",
  "example_sentence": "结合英文单词和图片描述，给出一个简单的例句",
  "explaination": "结合图片解释英文单词，段落以Look at...开头，将段落分句，每一句单独一行，解释的最后给一个日常生活有关的问句",
  "explaination_replys": ["根据explaination给出的回复1", "根据explaination给出的回复2"]
}
`;

const update = async (imageData: string) => {
  imgPreview.value = imageData;

  const endpoint = import.meta.env.VITE_KIMI_API_ENDPOINT + '/chat/completions';
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_KIMI_API_KEY}`
  };

  word.value = '分析中...';

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      model: 'moonshot-v1-8k-vision-preview',
      messages: [
        {
          role: 'user',
          content: [{
            type: "image_url",
            image_url: {
              "url": imageData,
            },
          }, {
            type: "text",
            text: userPrompt,
          }]
        }
      ],
      stream: false,
    })
  });

  const data = await response.json();
  console.log(data);
  const replyData = JSON.parse(data.choices[0].message.content);
  word.value = replyData.representative_word;
  sentence.value = replyData.example_sentence;
  explainations.value = replyData.explaination.split('\n').filter((item: any) => item!== '');
  expReply.value = replyData.explaination_replys;
  const audioUrl = await generateAudio(replyData.example_sentence); 
  audio.value = audioUrl;
};

const submit = async (imageData: string) => {
  update(imageData);
};
</script>

<template>
  <div class="container">
    <PictureCard @update-image="submit" :word="word" :audio="audio"/>
    <div class="output">
      <div>{{ sentence }}</div>
      <div class="details">
        <button @click="detailExpand = !detailExpand">Talk about it</button>
        <div v-if="!detailExpand" class="fold"></div>
        <div v-else class="expand">
          <img :src="imgPreview" alt="preview" />
          <div class="explaination" v-for="item in explainations">
            <p>{{ item }}</p>
          </div>
          <div class="reply" v-for="item in expReply">
            <p>{{ item }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  font-size: .85rem;
  background: linear-gradient(180deg, rgb(235, 189, 161) 0%, rgb(71, 49, 32) 100%);
}

#selecteImage {
  display: none;
}

.input {
  width: 200px;
}

.output {
  margin-top: 20px;
  /* min-height: 300px; */
  width: 80%;
  text-align: center;
  font-weight: bold;
}

.preview img {
  max-width: 100%;
}

button {
  padding: 0 10px;
  margin-left: 6px;
}

.details {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}
.details button {
  background-color: black;
  color: white;
  width: 160px;
  height: 32px;
  border-radius: 8px 8px 0 0;
  border: none;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
}
.details .fold {
  width: 200px;
  height: 30px;
  background-color: white;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.details .expand {
  width: 200px;
  height: 88vh;
  background-color: white;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}
.expand img {
  width: 60%;
  margin-top: 20px;
  border-radius: 6px;
}
.expand .explaination {
  color: black;
  font-weight: normal;
}
.expand .explaination p {
  margin: 0 10px 10px 10px;
}
.expand .reply {
  color: black;
  font-weight: normal;
  margin-top: 20px;
}
.expand .reply p {
  padding: 4px 10px;
  margin: 0 10px 10px 10px;
  border-radius: 6px;
  border: solid 1px grey;
}
</style>
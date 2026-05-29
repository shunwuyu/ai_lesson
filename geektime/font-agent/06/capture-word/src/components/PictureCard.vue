<script setup lang="ts">
import { ref } from 'vue';
import defaultCameraImg from '../assets/camera.png';
import voiceIcon from '../assets/voice.png';

const imgPreview = ref(defaultCameraImg);

const emit = defineEmits(['updateImage']);

const props = defineProps({
    word: {
        type: String,
        default: '',
    },
    audio: {
        type: String,
        default: '',
    }
});

const updateImageData = async (e: Event): Promise<any> => {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (!file) {
    return;
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const data = reader.result as string;
      imgPreview.value = data;
      emit('updateImage', data);
      resolve(data);
    };
    reader.onerror = (error) => {
      reject(error);
    };
  });
};

const playAudio = () => { 
    const audio = new Audio(props.audio); 
    audio.play();
}
</script>

<template>
  <div class="card">
    <input id="selecteImage" class="input" type="file" accept=".jpg, .jpeg, .png, .gif" @change="updateImageData" />
    <label for="selecteImage" class="upload">
      <img :src="imgPreview" alt="preview" />
    </label>
    <div class="word">{{ props.word }}</div>
    <div v-if="audio" class="playAudio" @click="playAudio">
        <img width="20px" :src="voiceIcon" alt="logo" />
    </div>
  </div>
</template>

<style scoped>
#selecteImage {
  display: none;
}
.card {
  border-radius: 8px;
  padding: 20px;
  margin-top: 40px;
  height: 280px;
  box-shadow: rgb(63,38,21) 0 3px 0px 0;
  background-color: rgb(105,78,62);
  box-sizing: border-box;
}
.upload {
  width: 160px;
  height: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.upload img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.word {
  margin-top: 20px;
  font-size: 16px;
  color: rgb(255,255,255);
}
.playAudio {
  margin-top: 16px;
}

.playAudio img {
  cursor: pointer;
}
</style>
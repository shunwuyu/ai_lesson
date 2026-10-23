<script setup lang="ts">
import { ref } from "vue";
import { uploadFile } from "../api/upload";
// 声明一个 ref 变量，用来绑定 DOM 的文件上传 input 元素，保存它的实例。
const fileInput = ref<HTMLInputElement | null>(null);
// 声明一个 ref 变量，用来保存用户选择的文件实例。
const selectedFile = ref<File | null>(null);
// 声明一个 ref 变量，用来保存上传状态。
const uploading = ref(false);
// 声明一个 ref 变量，用来保存上传进度。
const progress = ref(0);
// 声明一个 ref 变量，用来保存上传结果。
const message = ref("");
// 声明一个 ref 变量，用来保存上传结果。
// 因为后端返回结构不固定，用`any` 省去定义接口类型更省事，
// 代价是丢掉类型检查。
const result = ref<any>(null);

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "application/pdf",
  // 支持 docx 文件
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const MAX_SIZE = 10 * 1024 * 1024; // 10MB

function handleFileChange(event: Event) {
  // 从事件对象中获取文件输入元素实例。
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;

  if (!ALLOWED_TYPES.includes(file.type)) {
    message.value = "只支持 jpg、png、pdf、docx 文件";
    selectedFile.value = null;
    return;
  }

  if (file.size > MAX_SIZE) {
    message.value = "文件不能超过 10MB";
    selectedFile.value = null;
    return;
  }

  selectedFile.value = file;
  message.value = "";
  result.value = null;
}

async function handleUpload() {
  if (!selectedFile.value) {
    message.value = "请先选择文件";
    return;
  }

  uploading.value = true;
  progress.value = 0;
  message.value = "上传中...";

  try {
    const res = await uploadFile(selectedFile.value);
    result.value = res.data.data;
    message.value = "上传成功";
    selectedFile.value = null;

    if (fileInput.value) {
      fileInput.value.value = "";
    }
  } catch (error: any) {
    message.value = error?.response?.data?.detail || "上传失败";
  } finally {
    uploading.value = false;
  }
}
</script>

<template>
  <div class="mx-auto max-w-xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
    <h1 class="mb-4 text-xl font-semibold text-gray-800">文件上传</h1>

    <input
      ref="fileInput"
      type="file"
      class="mb-4 w-full rounded-lg border border-gray-300 p-2 text-sm text-gray-700"
      @change="handleFileChange"
    />

    <div v-if="selectedFile" class="mb-4 text-sm text-gray-600">
      已选择：{{ selectedFile.name }}（{{ (selectedFile.size / 1024).toFixed(2) }} KB）
    </div>

    <button
      class="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 disabled:opacity-50"
      :disabled="uploading || !selectedFile"
      @click="handleUpload"
    >
      {{ uploading ? "上传中" : "开始上传" }}
    </button>

    <div v-if="message" class="mt-4 text-sm" :class="message.includes('成功') ? 'text-green-600' : 'text-red-600'">
      {{ message }}
    </div>

    <div v-if="result" class="mt-4 rounded-lg bg-gray-50 p-4 text-sm text-gray-700">
      <p>原始文件名：{{ result.original_name }}</p>
      <p>保存文件名：{{ result.saved_name }}</p>
      <p>文件大小：{{ (result.size / 1024).toFixed(2) }} KB</p>
    </div>
  </div>
</template>
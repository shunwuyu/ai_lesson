<template>
  <div class="form-container">
    <h2>用户信息表单</h2>

    <!-- 加载状态 -->
    <div v-if="loading" class="loading-mask">
      <p>正在提交，请稍候...</p>
    </div>

    <!-- 表单 -->
    <div class="form-content">
      <label>
        用户名：
        <input v-model="form.username" placeholder="请输入用户名" />
      </label>

      <label>
        年龄：
        <input type="number" v-model="form.age" />
      </label>

      <label>
        城市：
        <input v-model="form.address.city" />
      </label>

      <button @click="submitForm" :disabled="loading">
        {{ loading ? '提交中...' : '提交' }}
      </button>
    </div>

    <!-- 输出当前数据 -->
    <div class="result">
      <h3>当前数据：</h3>
      <pre>{{ form }}</pre>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const loading = ref(false) // 单独状态
const form = reactive({
  username: '',
  age: 18,
  address: { city: 'Shanghai' } // 嵌套自动响应
})

function submitForm() {
  loading.value = true
  setTimeout(() => {
    alert(`提交成功：${JSON.stringify(form)}`)
    loading.value = false
  }, 1000)
}
</script>

<style scoped>
.form-container {
  max-width: 400px;
  margin: 40px auto;
  padding: 24px;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  background: #fafafa;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  position: relative;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.form-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

label {
  display: flex;
  flex-direction: column;
  font-size: 14px;
  color: #555;
}

input {
  margin-top: 4px;
  padding: 6px 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
}

input:focus {
  border-color: #409eff;
  box-shadow: 0 0 0 1px #409eff22;
}

button {
  margin-top: 10px;
  padding: 8px 0;
  border: none;
  border-radius: 6px;
  background-color: #409eff;
  color: white;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
}

button:hover:not(:disabled) {
  background-color: #66b1ff;
}

button:disabled {
  background-color: #a0cfff;
  cursor: not-allowed;
}

.result {
  margin-top: 20px;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 12px;
  font-size: 13px;
  color: #333;
  overflow-x: auto;
}

.loading-mask {
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #409eff;
  font-size: 15px;
  font-weight: bold;
  border-radius: 12px;
}
</style>

<template>
  <!-- View：纯展示层，只负责渲染和用户交互 -->
  <div class="user-editor">
    <h2>用户信息</h2>

    <p>姓名: {{ user.name }}</p>
    <p>邮箱: {{ user.email }}</p>
    <p>状态: {{ isDirty ? '已修改' : '未修改' }}</p>

    <div style="margin-top: 16px;">
      <input v-model="form.name" placeholder="输入姓名" />
      <input v-model="form.email" placeholder="输入邮箱" type="email" />

      <button @click="save" :disabled="!isDirty">保存</button>
      <button @click="reset" :disabled="!isDirty">重置</button>
    </div>
  </div>
</template>

<script setup>
// ----------------------------
// 🧠 ViewModel（核心逻辑层）
// ----------------------------

import { ref, reactive, computed, watch } from 'vue'

// ===== 1. Model（原始数据模型）=====
// 通常来自 API 或业务逻辑，是“纯数据”
const initialUserData = {
  id: 1,
  name: '张三',
  email: 'zhangsan@example.com'
}

// ===== 2. ViewModel 开始 =====

// 将 Model 包装为响应式（可被 View 使用）
const user = reactive({ ...initialUserData })

// 表单的临时编辑状态（也是 Model 的副本）
const form = reactive({ ...initialUserData })

// 计算属性：判断表单是否被修改（脏检查）
const isDirty = computed(() => {
  return form.name !== user.name || form.email !== user.email
})

// 保存：将表单数据提交回 Model（并模拟 API 调用）
function save() {
  // 更新原始 Model（在真实场景中会调用 API）
  user.name = form.name
  user.email = form.email
  console.log('✅ 已保存到 Model:', user)
}

// 重置：从 Model 恢复表单
function reset() {
  form.name = user.name
  form.email = user.email
}

// （可选）监听 Model 变化，可用于日志或副作用
watch(
  // 👇 1. 依赖源（getter 函数）
  // 返回一个 user 的浅拷贝（新对象），用于触发响应式追踪
  // 使用 {...user} 是为了确保每次 user 内部属性变化时，
  // 这个 getter 返回的是一个“新引用”，从而让 Vue 能检测到变化
  () => ({ ...user }),

  // 👇 2. 回调函数（当依赖变化时执行）
  // newVal 是当前 getter 返回的新值（即新的 {...user} 对象）
  (newVal) => {
    console.log('📡 Model 发生变化:', newVal);
    // 通常这里可以做：发送埋点、同步到 localStorage、触发其他副作用等
  },

  // 👇 3. 选项配置
  { 
    deep: true 
    // ⚠️ 注意：虽然这里写了 deep: true，
    // 但由于 getter 返回的是一个普通对象（非响应式引用），
    // 实际上 **deep: true 在这里是多余的**。
    // 更准确地说：因为 {...user} 每次都返回新对象，
    // Vue 通过引用比较就能发现变化，不需要 deep。
    // 如果直接 watch(user, ..., { deep: true }) 才真正需要 deep。
  }
)
</script>

<style scoped>
.user-editor {
  padding: 16px;
  border: 1px solid #ccc;
  max-width: 400px;
}
</style>
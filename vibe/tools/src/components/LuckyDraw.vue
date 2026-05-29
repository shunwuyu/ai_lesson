<template>
  <div class="lucky-draw-container">
    <h1>抽奖程序</h1>
    
    <!-- 用户输入区域 -->
    <div class="input-section">
      <label for="user-input">用户信息（用逗号分隔）：</label>
      <textarea 
        id="user-input" 
        v-model="userInputText" 
        placeholder="请输入用户信息，用逗号分隔，例如：张三,李四,王五"
        rows="4"
      ></textarea>
      
      <label for="draw-number">抽奖人数：</label>
      <input 
        id="draw-number" 
        type="number" 
        v-model.number="currentDrawNumber" 
        min="1"
        :max="availableUsers.length"
      />
      
      <button 
        @click="parseUsers" 
        class="btn btn-primary"
      >
        解析用户
      </button>
    </div>
    
    <!-- 用户列表区域 -->
    <div class="users-section">
      <div class="section">
        <h3>全部用户 ({{ allUsers.length }})</h3>
        <div class="user-list">
          <span 
            v-for="user in allUsers" 
            :key="user.id" 
            class="user-tag"
            :class="{ 'winner': isWinner(user.id) }"
          >
            {{ user.name }}
          </span>
        </div>
      </div>
      
      <div class="section">
        <h3>未中奖用户 ({{ availableUsers.length }})</h3>
        <div class="user-list">
          <span 
            v-for="user in availableUsers" 
            :key="user.id" 
            class="user-tag available"
          >
            {{ user.name }}
          </span>
        </div>
      </div>
      
      <div class="section">
        <h3>已中奖用户 ({{ winners.length }})</h3>
        <div class="user-list">
          <span 
            v-for="user in winners" 
            :key="user.id" 
            class="user-tag winner"
          >
            {{ user.name }}
          </span>
        </div>
      </div>
    </div>
    
    <!-- 抽奖按钮 -->
    <div class="draw-section">
      <button 
        @click="draw" 
        class="btn btn-draw"
        :disabled="!canDraw"
      >
        {{ isDrawing ? '抽奖中...' : `开始抽奖 (抽取 ${currentDrawNumber} 人)` }}
      </button>
      
      <button 
        @click="resetDraw" 
        class="btn btn-secondary"
      >
        重置抽奖
      </button>
    </div>
    
    <!-- 抽奖结果区域 -->
    <div v-if="drawResults.length > 0" class="results-section">
      <h3>抽奖结果记录</h3>
      <div class="results-list">
        <div 
          v-for="(result, index) in drawResults" 
          :key="index" 
          class="result-item"
        >
          <h4>第 {{ result.round }} 轮抽奖 ({{ formatDate(result.timestamp) }})</h4>
          <div class="winner-list">
            <span 
              v-for="winner in result.winners" 
              :key="winner.id" 
              class="winner-tag"
            >
              {{ winner.name }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { User, DrawResult } from '../types';

// 响应式数据
const userInputText = ref('');
const currentDrawNumber = ref(1);
const allUsers = ref<User[]>([]);
const availableUsers = ref<User[]>([]);
const winners = ref<User[]>([]);
const drawResults = ref<DrawResult[]>([]);
const isDrawing = ref(false);
let currentRound = 0;

// 计算属性
const canDraw = computed(() => {
  return availableUsers.value.length >= currentDrawNumber.value && 
         currentDrawNumber.value >= 1 && 
         !isDrawing.value;
});

// 方法
// 解析用户输入
const parseUsers = () => {
  if (!userInputText.value.trim()) {
    alert('请输入用户信息！');
    return;
  }
  
  // 分割用户信息并去重
  const userNames = userInputText.value
    .split(',')
    .map(name => name.trim())
    .filter(name => name.length > 0);
  
  if (userNames.length === 0) {
    alert('请输入有效的用户信息！');
    return;
  }
  
  // 创建用户对象数组
  allUsers.value = userNames.map((name, index) => ({
    id: `user_${Date.now()}_${index}`,
    name
  }));
  
  // 重置可抽奖用户和中奖用户
  availableUsers.value = [...allUsers.value];
  winners.value = [];
  drawResults.value = [];
  currentRound = 0;
  
  alert(`成功解析 ${allUsers.value.length} 名用户！`);
};

// 判断用户是否已中奖
const isWinner = (userId: string): boolean => {
  return winners.value.some(user => user.id === userId);
};

// 抽奖
const draw = async () => {
  if (!canDraw.value) return;
  
  isDrawing.value = true;
  
  // 模拟抽奖动画延迟
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  currentRound++;
  const newWinners: User[] = [];
  
  // 随机抽取指定数量的用户
  const tempAvailableUsers = [...availableUsers.value];
  
  for (let i = 0; i < currentDrawNumber.value && tempAvailableUsers.length > 0; i++) {
    const randomIndex = Math.floor(Math.random() * tempAvailableUsers.length);
    const winner = tempAvailableUsers.splice(randomIndex, 1)[0];
    newWinners.push(winner);
  }
  
  // 更新状态
  winners.value.push(...newWinners);
  availableUsers.value = tempAvailableUsers;
  
  // 记录抽奖结果
  drawResults.value.push({
    round: currentRound,
    timestamp: new Date(),
    winners: newWinners
  });
  
  isDrawing.value = false;
  
  // 显示抽奖结果
  const winnerNames = newWinners.map(user => user.name).join('、');
  alert(`恭喜！第 ${currentRound} 轮抽奖中奖用户：${winnerNames}`);
};

// 重置抽奖
const resetDraw = () => {
  if (confirm('确定要重置抽奖吗？这将清除所有抽奖记录。')) {
    availableUsers.value = [...allUsers.value];
    winners.value = [];
    drawResults.value = [];
    currentRound = 0;
  }
};

// 格式化日期
const formatDate = (date: Date): string => {
  return new Date(date).toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
};
</script>

<style scoped>
.lucky-draw-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
}

.input-section {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.input-section label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #555;
}

.input-section textarea,
.input-section input {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.input-section input[type="number"] {
  max-width: 150px;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-draw {
  background-color: #28a745;
  color: white;
  font-size: 16px;
  padding: 12px 30px;
  margin-right: 10px;
}

.btn-draw:hover {
  background-color: #218838;
}

.btn-draw:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #5a6268;
}

.users-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.section {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.section h3 {
  margin-bottom: 15px;
  color: #333;
}

.user-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.user-tag {
  display: inline-block;
  padding: 5px 10px;
  background-color: #e9ecef;
  border-radius: 15px;
  font-size: 12px;
  color: #495057;
}

.user-tag.available {
  background-color: #d4edda;
  color: #155724;
}

.user-tag.winner {
  background-color: #f8d7da;
  color: #721c24;
  font-weight: bold;
}

.draw-section {
  text-align: center;
  margin-bottom: 30px;
}

.results-section {
  margin-top: 30px;
}

.results-section h3 {
  margin-bottom: 20px;
  color: #333;
}

.results-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.result-item {
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.result-item h4 {
  margin-bottom: 10px;
  color: #007bff;
}

.winner-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.winner-tag {
  display: inline-block;
  padding: 5px 10px;
  background-color: #f8d7da;
  color: #721c24;
  border-radius: 15px;
  font-size: 12px;
  font-weight: bold;
}

@media (max-width: 768px) {
  .users-section {
    grid-template-columns: 1fr;
  }
  
  .draw-section {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .btn-draw {
    margin-right: 0;
  }
}
</style>
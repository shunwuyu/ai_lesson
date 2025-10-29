// 抽奖程序类型定义

// 用户信息接口
export interface User {
  id: string;
  name: string;
}

// 抽奖轮次结果接口
export interface DrawResult {
  round: number;
  timestamp: Date;
  winners: User[];
}

// 抽奖状态接口
export interface DrawState {
  allUsers: User[];         // 所有参与用户
  availableUsers: User[];   // 当前可参与抽奖用户（未中奖用户）
  winners: User[];          // 已中奖用户
  drawResults: DrawResult[]; // 抽奖结果记录
  currentDrawNumber: number; // 当前抽奖人数
  userInputText: string;    // 用户输入的文本
  isDrawing: boolean;       // 是否正在抽奖动画中
}
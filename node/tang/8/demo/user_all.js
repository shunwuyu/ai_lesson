// 文件 export_all.js

// 从 user2.js 中导出所有的模块成员
export * from './user2.js'

// 导出一个默认模块，对象包含 goal 属性，初始值为 'learn'
export default {
  goal: 'learn'
}

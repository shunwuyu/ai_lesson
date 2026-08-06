import { 
  // 创建一个跨组件共享的上下文容器 ，不用层层传 props 就能在任意子孙组件里读取值
  createContext
} from "react";
// 创建一个主题上下文对象，默认值设为 "light" 
// （浅色主题），
// 导出供 Provider 包裹和组件消费使用。
export const ThemeContext = createContext("light"); // 默认值
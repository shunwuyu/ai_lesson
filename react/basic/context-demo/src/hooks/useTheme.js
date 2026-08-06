// useTheme.js
import { useContext } from "react";
import { ThemeContext } from "../ThemeContext";

// 封装 Context 消费逻辑，统一对外暴露类型安全的主题
// 访问接口，降低业务组件对 Context 实现的耦合，
// 便于后续扩展。
export function useTheme() {
  return useContext(ThemeContext);
}

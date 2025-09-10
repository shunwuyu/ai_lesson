import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"


// 这段代码定义了一个 cn 工具函数，用于安全合并 Tailwind CSS 类名，
// 优先级更高的类会覆盖前面的，同时支持条件式写法
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

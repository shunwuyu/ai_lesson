import React, { ReactNode } from 'react';
import { Button } from '@/components/ui/button'; // 导入shadcn的Button组件
import { ArrowLeft } from 'lucide-react'; // shadcn默认配套lucide-react图标库，需确保已安装（npm install lucide-react）

// 定义标题栏组件的Props类型，保证TypeScript类型安全
interface HeaderProps {
  /** 标题栏主标题 */
  title: string;
  /** 是否显示返回按钮（适用于子页面） */
  showBackBtn?: boolean;
  /** 点击返回按钮的回调事件 */
  onBackClick?: () => void;
  /** 标题栏右侧自定义操作内容（如按钮、用户信息等） */
  rightContent?: ReactNode;
  /** 标题栏左侧自定义内容（默认显示返回按钮/空，可覆盖） */
  leftContent?: ReactNode;
  /** 自定义标题栏类名（用于覆盖样式，提高灵活性） */
  className?: string;
  /** 标题是否居中（默认左对齐，配合返回按钮；子页面可设置居中） */
  isTitleCenter?: boolean;
}

/**
 * 公共标题栏组件（基于shadcn/ui + Tailwind CSS）
 * 支持返回按钮、自定义标题、右侧操作区、样式覆盖等功能
 */
const Header: React.FC<HeaderProps> = ({
  title,
  showBackBtn = false,
  onBackClick = () => window.history.back(), // 默认回调：浏览器返回上一页
  rightContent = null,
  leftContent = null,
  className = '',
  isTitleCenter = false,
}) => {
  // 渲染左侧内容（优先级：自定义leftContent > 默认返回按钮）
  const renderLeftContent = () => {
    if (leftContent) return leftContent;
    if (showBackBtn) {
      return (
        <Button
          variant="ghost"
          size="icon"
          onClick={onBackClick}
          aria-label="返回上一页"
          className="hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <ArrowLeft size={20} />
        </Button>
      );
    }
    return null;
  };

  return (
    <header
      className={`
        flex items-center justify-between
        h-16 px-4 md:px-6
        border-b border-gray-200 dark:border-gray-800
        bg-white dark:bg-gray-950
        sticky top-0 z-40
        shadow-sm
        ${isTitleCenter ? 'justify-center' : ''}
        ${className}
      `}
    >
      {/* 左侧区域：返回按钮/自定义内容 */}
      <div className={`flex items-center ${isTitleCenter ? 'absolute left-4 md:left-6' : ''}`}>
        {renderLeftContent()}
      </div>

      {/* 中间标题区域 */}
      <h1
        className={`
          text-lg md:text-xl font-semibold
          text-gray-900 dark:text-gray-100
          truncate max-w-[200px] md:max-w-[400px]
        `}
      >
        {title}
      </h1>

      {/* 右侧区域：自定义操作内容 */}
      <div className={`flex items-center gap-2 ${isTitleCenter ? 'absolute right-4 md:right-6' : ''}`}>
        {rightContent}
      </div>
    </header>
  );
};

export default Header;
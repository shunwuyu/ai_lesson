// components/InfiniteScroll.tsx
import { useEffect, useRef } from 'react';

interface InfiniteScrollProps {
  onLoadMore: () => void;
  hasMore: boolean;
  isLoading?: boolean;
  children: React.ReactNode;
}

export default function InfiniteScroll({
  onLoadMore,
  hasMore,
  isLoading = false,
  children,
}: InfiniteScrollProps) {
  // 响应式对象  div 元素
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasMore || isLoading) return; // 到底了 还在加载中
    // 交叉观察器
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onLoadMore();
        }
      },
      // 只有当目标元素 100% 完全进入视口（或根容器）时，
      // IntersectionObserver 才会触发回调。
      { threshold: 1.0 }
    );

    if (sentinelRef.current) {
      // 监听元素
      observer.observe(sentinelRef.current);
    }

    return () => {
      // 卸载
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
      }
    };
  }, [onLoadMore, hasMore, isLoading]);

  return (
    <>
      {children}
      {/* 作为一个“哨兵”元素，用于被 IntersectionObserver 监听
        当这个空的 <div> 进入视口（即用户滚动到页面底部附近）时，
        就触发 onLoadMore 加载更多数据，从而实现无限滚动（Infinite Scroll）
      */}
      <div ref={sentinelRef} className="h-4" />
      {isLoading && (
        <div className="text-center py-4 text-sm text-muted-foreground">
          加载中...
        </div>
      )}
    </>
  );
}
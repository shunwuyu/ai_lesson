// components/BackToTop.tsx
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';
import { throttle } from '@/utils';

interface BackToTopProps {
  /** 滚动超过多少像素后显示按钮（默认 400px） */
  threshold?: number;
}

export function BackToTop({ threshold = 400 }: BackToTopProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > threshold);
    };
    const throttled_func = throttle(toggleVisibility, 200);
    window.addEventListener('scroll', throttled_func);
    return () => window.removeEventListener('scroll', throttled_func);
  }, [threshold]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={scrollToTop}
      aria-label="回到顶部"
      className={`fixed bottom-6 right-6 z-50 rounded-full shadow-lg hover:shadow-xl`}
    >
      <ArrowUp className="h-4 w-4" />
    </Button>
  );
}
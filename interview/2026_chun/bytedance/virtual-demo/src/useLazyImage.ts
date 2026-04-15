// useLazyImage.ts
import { useEffect, useRef } from "react";

export function useLazyImage() {
  const ref = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const img = ref.current;
    if (!img) return;
    // 观察者模式
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const realSrc = img.dataset.src;
        if (realSrc) {
          img.src = realSrc;
        }
        observer.disconnect();
      }
    });

    observer.observe(img);

    return () => observer.disconnect();
  }, []);

  return ref;
}
import { useEffect, useRef } from "react";

export function useLazyImage() {
  const ref = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const img = ref.current;
    if (!img) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const src = img.dataset.src;
        if (src) img.src = src;
        observer.disconnect();
      }
    });

    observer.observe(img);
    return () => observer.disconnect();
  }, []);

  return ref;
}
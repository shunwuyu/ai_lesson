// src/hooks/useLazyImage.js
import { useEffect, useRef, useState } from 'react';

export default function useLazyImage(src) {
  const ref = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const ob = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setVisible(true);
        ob.disconnect();
      }
    });

    if (ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, []);

  return [ref, visible ? src : ''];
}
// src/hooks/useIntersection.js
import { useEffect, useRef } from 'react';

export default function useIntersection(cb) {
  const ref = useRef();

  useEffect(() => {
    const ob = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) cb();
    });

    if (ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, [cb]);

  return ref;
}
// src/hooks/useResponsiveColumn.js
import { useEffect, useState } from 'react';

export default function useResponsiveColumn() {
  const calc = () => (window.innerWidth < 768 ? 2 : 4);
  const [col, setCol] = useState(calc());

  useEffect(() => {
    const fn = () => setCol(calc());
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);

  return col;
}
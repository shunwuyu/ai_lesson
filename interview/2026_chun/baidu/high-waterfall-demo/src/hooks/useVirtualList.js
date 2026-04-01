// src/hooks/useVirtualList.js
import { useMemo } from 'react';

export default function useVirtualList(list, scrollTop, viewH) {
  return useMemo(() => {
    return list.filter(item =>
      item.top + item.height > scrollTop - 200 &&
      item.top < scrollTop + viewH + 200
    );
  }, [list, scrollTop, viewH]);
}
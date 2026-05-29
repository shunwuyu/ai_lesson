// src/pages/Home.jsx
import { useEffect, useState, useCallback } from 'react';
import WaterfallVirtual from '../components/WaterfallVirtual';
import { fetchList } from '../api/list';
import useIntersection from '../hooks/useIntersection';
import useResponsiveColumn from '../hooks/useResponsiveColumn';

export default function Home() {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const column = useResponsiveColumn();

  const loadMore = useCallback(async () => {
    const res = await fetchList(page, 20);
    setList(prev => [...prev, ...res.list]);
    setPage(p => p + 1);
  }, [page]);

  useEffect(() => {
    loadMore();
  }, []);

  const ref = useIntersection(loadMore);

  return (
    <>
      <WaterfallVirtual data={list} column={column} />
      <div ref={ref} style={{ textAlign: 'center', padding: 20 }}>
        加载更多...
      </div>
    </>
  );
}
// src/components/WaterfallVirtual.jsx
import { useEffect, useRef, useState } from 'react';
import useLazyImage from '../hooks/useLazyImage';
import useVirtualList from '../hooks/useVirtualList';

function Item({ item }) {
  const [ref, src] = useLazyImage(item.img);

  return (
    <div ref={ref}>
      {src && (
        <img
          src={src}
          style={{ width: '100%', height: item.imgHeight }}
        />
      )}
      <div>{item.title}</div>
    </div>
  );
}

export default function WaterfallVirtual({ data, column }) {
  const ref = useRef();
  const [positions, setPositions] = useState([]);
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    const el = ref.current;
    const onScroll = () => setScrollTop(el.scrollTop);
    el.addEventListener('scroll', onScroll);
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!data.length || !ref.current) return;

    const width = ref.current.clientWidth;
    const itemW = width / column;
    const colH = new Array(column).fill(0);

    const list = data.map(item => {
      const imgH = itemW * item.ratio;
      const total = imgH + 40;

      const min = Math.min(...colH);
      const idx = colH.indexOf(min);

      const obj = {
        ...item,
        width: itemW,
        imgHeight: imgH,
        height: total,
        top: min,
        left: idx * itemW
      };

      colH[idx] += total;
      return obj;
    });

    setPositions(list);
  }, [data, column]);

  const visibleList = useVirtualList(
    positions,
    scrollTop,
    window.innerHeight
  );

  const totalH = Math.max(...positions.map(i => i.top + i.height), 0);

  return (
    <div
      ref={ref}
      style={{ height: '100vh', overflowY: 'auto', position: 'relative' }}
    >
      <div style={{ height: totalH, position: 'relative' }}>
        {visibleList.map(item => (
          <div
            key={item.id}
            style={{
              position: 'absolute',
              width: item.width,
              top: item.top,
              left: item.left
            }}
          >
            <Item item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}
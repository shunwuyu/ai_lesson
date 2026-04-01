import { useEffect, useRef, useState } from 'react';

export default function Waterfall({ data, column = 3, gap = 10 }) {
  const containerRef = useRef(null);
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    if (!data.length || !containerRef.current) return;

    const containerWidth = containerRef.current.clientWidth;
    const itemWidth = (containerWidth - gap * (column - 1)) / column;

    const colHeights = new Array(column).fill(0);
    const newPositions = [];

    const titleAreaHeight = 40;

    data.forEach((item) => {
      // ✅ 用 ratio 直接算图片高度
      const scaleH = itemWidth * item.ratio;

      const cardTotalH = scaleH + titleAreaHeight;

      const minH = Math.min(...colHeights);
      const idx = colHeights.indexOf(minH);

      newPositions.push({
        ...item,
        width: itemWidth,
        height: cardTotalH,
        imgHeight: scaleH,
        top: minH,
        left: idx * (itemWidth + gap),
      });

      colHeights[idx] += cardTotalH + gap;
    });

    setPositions(newPositions);
  }, [data, column, gap]);

  const containerHeight = positions.length
    ? Math.max(...positions.map((i) => i.top + i.height))
    : 0;

  return (
    <div
      ref={containerRef}
      style={{ position: 'relative', height: containerHeight }}
    >
      {positions.map((item) => (
        <div
          key={item.id}
          style={{
            position: 'absolute',
            width: item.width,
            height: item.height,
            top: item.top,
            left: item.left,
            background: '#fff',
            borderRadius: 8,
            overflow: 'hidden',
          }}
        >
          {/* ✅ 按比例直接渲染 */}
          <img
            src={item.img}
            alt=""
            style={{
              width: '100%',
              height: item.imgHeight,
              objectFit: 'cover',
              display: 'block',
            }}
          />

          <div style={{ padding: '8px', fontSize: '14px', color: '#333' }}>
            {item.title}
          </div>
        </div>
      ))}
    </div>
  );
}
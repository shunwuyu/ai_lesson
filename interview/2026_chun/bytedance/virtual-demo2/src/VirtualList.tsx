import React, { useEffect, useRef, useState } from "react";
import { fetchList, Item } from "./mock";
import { useLazyImage } from "./useLazyImage";

const ESTIMATED_HEIGHT = 120;
const BUFFER = 3;

export default function VirtualList() {
  const [list, setList] = useState<Item[]>([]);
  const [visibleData, setVisibleData] = useState<Item[]>([]);
  const [start, setStart] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const ticking = useRef(false);

  // ✅ 高度缓存
  const heights = useRef<number[]>([]);
  const positions = useRef<number[]>([]);

  const containerHeight = 600;
  const visibleCount = Math.ceil(containerHeight / ESTIMATED_HEIGHT);

  useEffect(() => {
    fetchList().then((res) => {
      setList(res);
      initPositions(res);
    });
  }, []);

  // ✅ 初始化 positions（前缀和）
  function initPositions(list: Item[]) {
    const pos: number[] = [];
    let sum = 0;

    for (let i = 0; i < list.length; i++) {
      const h = heights.current[i] || ESTIMATED_HEIGHT;
      sum += h;
      pos[i] = sum;
    }

    positions.current = pos;
  }

  // ✅ 二分查找 startIndex
  function getStartIndex(scrollTop: number) {
    const pos = positions.current;
    let left = 0;
    let right = pos.length - 1;

    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (pos[mid] < scrollTop) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }

    return left;
  }

  // ✅ 更新可视区域
  const update = (scrollTop: number) => {
    let startIndex = getStartIndex(scrollTop) - BUFFER;
    startIndex = Math.max(0, startIndex);

    let endIndex = startIndex + visibleCount + BUFFER * 2;
    endIndex = Math.min(list.length, endIndex);

    setStart(startIndex);
    setVisibleData(list.slice(startIndex, endIndex));
  };

  // ✅ rAF 节流
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;

    if (!ticking.current) {
      requestAnimationFrame(() => {
        update(scrollTop);
        ticking.current = false;
      });
      ticking.current = true;
    }
  };

  // ✅ 高度更新
  const onResize = (index: number, height: number) => {
    if (heights.current[index] !== height) {
      heights.current[index] = height;
      initPositions(list);
    }
  };

  // ✅ 总高度
  const totalHeight =
    positions.current[positions.current.length - 1] || 0;

  return (
    <div
      ref={containerRef}
      style={{ height: containerHeight, overflow: "auto" }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, position: "relative" }}>
        <div
          style={{
            position: "absolute",
            top: start === 0 ? 0 : positions.current[start - 1] || 0,
            left: 0,
            right: 0,
          }}
        >
          {visibleData.map((item, i) => (
            <ListItem
              key={item.id}
              item={item}
              index={start + i}
              onResize={onResize}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ListItem({
    item,
    index,
    onResize,
  }: {
    item: any;
    index: number;
    onResize: (i: number, h: number) => void;
  }) {
    const ref = useRef<HTMLDivElement>(null);
    const imgRef = useLazyImage();
  
    useEffect(() => {
      const el = ref.current;
      if (!el) return;
  
      const observer = new ResizeObserver(() => {
        const height = el.offsetHeight;
        onResize(index, height);
      });
  
      observer.observe(el);
  
      return () => observer.disconnect();
    }, []);
  
    return (
      <div
        ref={ref}
        style={{
          padding: 10,
          borderBottom: "1px solid #eee",
        }}
      >
        <img
          ref={imgRef}
          data-src={item.img}
          width={80}
          height={80}
          style={{ marginRight: 10 }}
        />
        <div>{item.title}</div>
      </div>
    );
  }
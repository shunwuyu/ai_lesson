// VirtualList.tsx
import React, { useEffect, useRef, useState } from "react";
import { fetchList, Item } from "./mock";
import { useLazyImage } from "./useLazyImage";

const ITEM_HEIGHT = 120;
const BUFFER = 3;

function ListItem({ item }: { item: Item }) {
    const imgRef = useLazyImage();
  
    return (
      <div
        style={{
          height: 120,
          display: "flex",
          alignItems: "center",
          borderBottom: "1px solid #eee",
          padding: "10px",
        }}
      >
        <img
          ref={imgRef}
          data-src={item.img}
          src=""
          width={80}
          height={80}
          style={{ marginRight: 10, background: "#f0f0f0" }}
        />
        <span>{item.title}</span>
      </div>
    );
  }

export default function VirtualList() {
  const [list, setList] = useState<Item[]>([]);
  const [visibleData, setVisibleData] = useState<Item[]>([]);
  const [start, setStart] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const ticking = useRef(false);

  const containerHeight = 600;
  const visibleCount = Math.ceil(containerHeight / ITEM_HEIGHT);

  useEffect(() => {
    fetchList().then((res) => {
      setList(res);
    });
  }, []);

  // 🧠 核心计算
  const update = (scrollTop: number) => {
    let startIndex = Math.floor(scrollTop / ITEM_HEIGHT) - BUFFER;
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

  // 初始化
  useEffect(() => {
    update(0);
  }, [list]);

  return (
    <div
      ref={containerRef}
      style={{
        height: containerHeight,
        overflow: "auto",
        border: "1px solid #ccc",
      }}
      onScroll={handleScroll}
    >
      {/* 占位高度 */}
      <div
        style={{
          height: list.length * ITEM_HEIGHT,
          position: "relative",
        }}
      >
        {/* 真正渲染 */}
        <div
          style={{
            position: "absolute",
            top: start * ITEM_HEIGHT,
            left: 0,
            right: 0,
          }}
        >
          {visibleData.map((item) => (
            <ListItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
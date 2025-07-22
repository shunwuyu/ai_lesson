import React, { useRef, useState, useEffect } from 'react';
import styles from './Swiper.module.css';

function Swiper({ slides }) {
  const wrapperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const startX = useRef(0);
  const currentX = useRef(0);
  const isDragging = useRef(false);
  const slideCount = slides.length;

  // 设置初始偏移
  useEffect(() => {
    updateTransform(0);
  }, []);

  const updateTransform = (index) => {
    if (wrapperRef.current) {
      wrapperRef.current.style.transition = 'transform 0.3s ease';
      wrapperRef.current.style.transform = `translateX(-${index * 100}%)`;
      setActiveIndex(index);
    }
  };

  const handleTouchStart = (e) => {
    isDragging.current = true;
    startX.current = e.touches[0].clientX;
    wrapperRef.current.style.transition = 'none';
  };

  const handleTouchMove = (e) => {
    if (!isDragging.current) return;
    currentX.current = e.touches[0].clientX;
    const delta = currentX.current - startX.current;
    wrapperRef.current.style.transform = `translateX(calc(${-activeIndex * 100}% + ${delta}px))`;
  };

  const handleTouchEnd = () => {
    if (!isDragging.current) return;
    const delta = currentX.current - startX.current;
    isDragging.current = false;

    let newIndex = activeIndex;
    const threshold = 50;
    if (delta > threshold && activeIndex > 0) {
      newIndex = activeIndex - 1;
    } else if (delta < -threshold && activeIndex < slideCount - 1) {
      newIndex = activeIndex + 1;
    }

    updateTransform(newIndex);
  };

  return (
    <div className={styles.swiperContainer}>
      <div
        className={styles.swiperWrapper}
        ref={wrapperRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {slides.map(slide => (
          <div key={slide.id} className={styles.slide}>
            <img src={slide.pic} alt={slide.title} />
            <div className={styles.title}>{slide.title}</div>
          </div>
        ))}
      </div>
      <div className={styles.indicators}>
        {slides.map((_, i) => (
          <span
            key={i}
            className={`${styles.dot} ${i === activeIndex ? styles.active : ''}`}
          />
        ))}
      </div>
    </div>
  );
}

export default Swiper;

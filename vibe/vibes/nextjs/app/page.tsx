"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

// Define image array
const IMAGES = [
  "/assets/Corgi_Bundle_720x.webp",
  "/assets/Hoshino-Ai-Sticker_360x.webp",
  "/assets/Genshin-mondstadt-keychains_360x.webp",
  "/assets/SG-Seraphine-Standee_360x.webp",
  "/assets/Madoka-Stickers_360x.webp"
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState("");
  const startX = useRef(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
    setIsDragging(true);
  };

  const handleMouseDown = (e) => {
    startX.current = e.clientX;
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - startX.current;
    setDragOffset(diff);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const currentX = e.clientX;
    const diff = currentX - startX.current;
    setDragOffset(diff);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (dragOffset > 100) {
      // Swipe right
      setDirection("right");
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? IMAGES.length - 1 : prevIndex - 1));
        setDirection("");
        setDragOffset(0);
      }, 300);
    } else if (dragOffset < -100) {
      // Swipe left
      setDirection("left");
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex === IMAGES.length - 1 ? 0 : prevIndex + 1));
        setDirection("");
        setDragOffset(0);
      }, 300);
    } else {
      // Return to center
      setDragOffset(0);
    }
  };

  const handleMouseUp = handleTouchEnd;

  useEffect(() => {
    const preventDefault = (e) => e.preventDefault();
    document.addEventListener("gesturestart", preventDefault);
    document.addEventListener("gesturechange", preventDefault);
    
    return () => {
      document.removeEventListener("gesturestart", preventDefault);
      document.removeEventListener("gesturechange", preventDefault);
    };
  }, []);

  return (
    <div style={{ backgroundColor: '#ffe7e5' }} className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="text-center w-full">
        <h1 className="text-xl font-bold">Swipe Left or Right</h1>
        <p className="text-sm">Image {currentIndex + 1} of {IMAGES.length}</p>
      </div>
      <div 
        style={{
          backgroundColor: '#f8faf8',
          borderRadius: '30px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          padding: '20px',
          width: '320px',
          height: '600px',
          textAlign: 'center',
          margin: 'auto',
          display: 'flex',
          justifyContent: 'center',
          border: '1px solid rgb(170 162 162)',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div 
          style={{
            transform: `translateX(${dragOffset}px) rotate(${dragOffset * 0.1}deg)`,
            transition: isDragging ? 'none' : 'transform 0.3s ease',
            opacity: direction ? 0 : 1,
          }}
        >
          <Image
            src={IMAGES[currentIndex]}
            alt={`Image ${currentIndex + 1}`}
            width={310}
            height={590}
            style={{
              borderRadius: '30px',
              border: '2px solid green',
              transform: 'scale(1.05)',
              objectFit: 'cover'
            }}
            priority
          />
        </div>
        
        {/* Direction indicators */}
        {dragOffset > 50 && (
          <div className="absolute top-10 right-10 bg-green-500 text-white px-4 py-2 rounded-full font-bold transform rotate-12">LIKE</div>
        )}
        {dragOffset < -50 && (
          <div className="absolute top-10 left-10 bg-red-500 text-white px-4 py-2 rounded-full font-bold transform -rotate-12">NOPE</div>
        )}
      </div>
      
      <div className="flex gap-6">
        <button 
          onClick={() => {
            setDirection("left");
            setTimeout(() => {
              setCurrentIndex((prevIndex) => (prevIndex === IMAGES.length - 1 ? 0 : prevIndex + 1));
              setDirection("");
            }, 300);
          }}
          className="bg-red-500 text-white px-6 py-3 rounded-full"
        >
          Dislike
        </button>
        <button 
          onClick={() => {
            setDirection("right");
            setTimeout(() => {
              setCurrentIndex((prevIndex) => (prevIndex === 0 ? IMAGES.length - 1 : prevIndex - 1));
              setDirection("");
            }, 300);
          }}
          className="bg-green-500 text-white px-6 py-3 rounded-full"
        >
          Like
        </button>
      </div>
    </div>
  );
}

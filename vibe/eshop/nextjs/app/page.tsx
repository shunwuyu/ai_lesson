"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [images, setImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startX, setStartX] = useState<number | null>(null);

  useEffect(() => {
    // Load all images from public/assets
    const imageFiles = [
      "/assets/Corgi_Bundle_720x.webp",
      "/assets/Genshin-mondstadt-keychains_360x.webp",
      "/assets/Hoshino-Ai-Sticker_360x.webp",
      "/assets/SG-Seraphine-Standee_360x.webp",
      "/assets/Madoka-Stickers_360x.webp"
      // Add more image paths here
    ];
    setImages(imageFiles);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!startX) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - startX;
    
    if (Math.abs(diff) > 50) { // Swipe threshold
      if (diff > 0) {
        // Swipe right
        setCurrentIndex(prev => Math.max(0, prev - 1));
      } else {
        // Swipe left
        setCurrentIndex(prev => Math.min(images.length - 1, prev + 1));
      }
      setStartX(null);
    }
  };

  return (
    <div style={{ backgroundColor: '#ffe7e5' }} className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div style={{ position: 'relative', width: '300px', height: '400px' }}>
        {/* X indicator */}
        <div style={{
          position: 'absolute',
          left: '-50px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: '#ff4444',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '24px',
          fontWeight: 'bold',
          opacity: 0.7,
          zIndex: 1
        }}>
          ✕
        </div>

        {/* Heart indicator */}
        <div style={{
          position: 'absolute',
          right: '-50px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: '#44ff44',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
         
        {images.length > 0 && (
          <Image
            src={images[currentIndex]}
            alt={`Image ${currentIndex + 1}`}
            width={310}
            height={410}
            style={{
              objectFit: 'cover',
              width: 'calc(100% - 10px)',
              height: 'calc(100% - 10px)',
              borderRadius: '20px',
              border: '5px solid #ffe7e5',
              transition: 'transform 0.3s ease'
            }}
          />
        )}
      </div>
    </div>
  );
}

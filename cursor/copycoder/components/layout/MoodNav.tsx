// src/components/layout/MoodNav.tsx
'use client';
import { Music, Heart, Coffee, HeartHandshake, Zap,  Dumbbell, Focus } from 'lucide-react';

const MoodNav = () => {
  return (
    <nav className="bg-secondary-dark text-white h-20 flex items-center overflow-x-auto">
      <div className="flex items-center space-x-4 p-4">
        <button className="flex items-center space-x-2">
          <Music />
          <span>Relaxed</span>
        </button>
        <button className="flex items-center space-x-2">
          <Heart />
          <span>Nostalgic</span>
        </button>
        <button className="flex items-center space-x-2">
          <Coffee />
          <span>Casual Talk</span>
        </button>
        <button className="flex items-center space-x-2">
          <HeartHandshake />
          <span>Romantic</span>
        </button>
        <button className="flex items-center space-x-2">
          <Zap />
          <span>Energetic</span>
        </button>
        <button className="flex items-center space-x-2">
         
          <span>Party</span>
        </button>
        <button className="flex items-center space-x-2">
          <Dumbbell />
          <span>Exercise</span>
        </button>
        <button className="flex items-center space-x-2">
          <Focus />
          <span>Focus</span>
        </button>
      </div>
    </nav>
  );
};

export default MoodNav;
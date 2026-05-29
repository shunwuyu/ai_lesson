import React from 'react';
import { ThumbsUp, MessageSquare, Star, Plus } from 'lucide-react';

interface BottomNavbarProps {
  likes: number;
  comments: number;
  authorAvatar: string;
}

export const BottomNavbar: React.FC<BottomNavbarProps> = ({ likes, comments, authorAvatar }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 px-4 py-3 z-50">
      <div className="max-w-screen-md mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-6 text-slate-500 dark:text-slate-400">
          <button className="flex items-center space-x-1.5 hover:text-blue-500 transition-colors">
            <ThumbsUp size={22} strokeWidth={1.5} />
            <span className="text-sm font-medium">{likes}</span>
          </button>
          <button className="flex items-center space-x-1.5 hover:text-blue-500 transition-colors">
            <MessageSquare size={22} strokeWidth={1.5} />
            <span className="text-sm font-medium">{comments}</span>
          </button>
          <button className="flex items-center hover:text-yellow-500 transition-colors">
            <Star size={22} strokeWidth={1.5} />
            <span className="ml-1 text-sm font-medium">收藏</span>
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <div className="w-px h-6 bg-slate-200 dark:bg-slate-700"></div>
          <div className="relative">
            <img 
              src={authorAvatar} 
              alt="Author" 
              className="w-8 h-8 rounded-full border border-slate-100 dark:border-slate-800 object-cover"
            />
            <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full border-2 border-white dark:border-slate-900 p-0.5">
              <Plus size={8} className="text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

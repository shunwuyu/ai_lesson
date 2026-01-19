
import React from 'react';
import { Moon, Sun } from 'lucide-react';

interface ArticleHeaderProps {
  title: string;
  author: {
    name: string;
    avatar: string;
    isFollowing: boolean;
  };
  metadata: {
    date: string;
    views: string;
    readTime: string;
  };
  isDark: boolean;
  toggleTheme: () => void;
}

const ArticleHeader: React.FC<ArticleHeaderProps> = ({
  title,
  author,
  metadata,
  isDark,
  toggleTheme,
}) => {
  return (
    <header className="px-4 py-6 space-y-4">
      <div className="flex justify-between items-start">
        <h1 className="text-2xl font-bold leading-snug tracking-tight text-slate-900 dark:text-white max-w-[85%]">
          {title}
        </h1>
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:scale-105 transition-transform"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      <div className="flex items-center justify-between mt-6">
        <div className="flex flex-col space-y-1">
          <span className="font-medium text-slate-800 dark:text-slate-200">{author.name}</span>
          <div className="flex items-center text-xs text-slate-400 space-x-3">
            <span>{metadata.date}</span>
            <span className="flex items-center">
              <span className="mr-1">👁</span> {metadata.views}
            </span>
            <span>阅读{metadata.readTime}</span>
          </div>
        </div>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-1.5 rounded-full text-sm font-medium transition-colors">
          关注
        </button>
      </div>
    </header>
  );
};

export default ArticleHeader;

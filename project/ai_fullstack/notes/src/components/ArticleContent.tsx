import React from 'react';
import { ArticleSection } from '../types';

interface ArticleContentProps {
  sections: ArticleSection[];
}

const ArticleContent: React.FC<ArticleContentProps> = ({ sections }) => {
  return (
    <article className="px-4 py-4 space-y-6 pb-24">
      {sections.map((section, index) => {
        switch (section.type) {
          case 'heading':
            return (
              <h2 key={index} className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
                {section.text}
              </h2>
            );
          case 'paragraph':
            return (
              <p key={index} className="text-slate-700 dark:text-slate-300 leading-7 text-[1.05rem]">
                {section.text}
              </p>
            );
          case 'quote':
            return (
              <div key={index} className="py-6 my-4">
                <p className="text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
                  {section.text}
                </p>
              </div>
            );
          case 'image':
            return (
              <div key={index} className="rounded-xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm my-6">
                <img 
                  src={section.url} 
                  alt="Article visual" 
                  className="w-full h-auto object-cover"
                />
              </div>
            );
          default:
            return null;
        }
      })}
      
      <div className="flex justify-center mt-12 pb-8">
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-2.5 rounded-full font-medium text-sm transition-all shadow-lg shadow-blue-500/20 active:scale-95">
          APP内打开
        </button>
      </div>
    </article>
  );
};

export default ArticleContent
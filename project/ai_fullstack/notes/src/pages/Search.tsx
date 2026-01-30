
import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, 
  Search as Sea, 
  X, 
  Trash2, 
  Clock, 
  ExternalLink,
  Loader2,
  TrendingUp
} from 'lucide-react';
import { useDebounce } from '../hooks/useDebounce';
import { doSearch } from '@/api/search'

import { useSearchStore } from './store/useSearchStore';


const Search: React.FC = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<SearchItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  
  const debouncedQuery = useDebounce(query, 300);
  const { history, addToHistory, clearHistory, removeHistoryItem } = useSearchStore();
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle suggestion fetching
  useEffect(() => {
    const getSuggestions = async () => {
      if (!debouncedQuery.trim()) {
        setSuggestions([]);
        return;
      }
      setIsLoading(true);
      try {
        const data = await fetchSuggestions(debouncedQuery);
        setSuggestions(data);
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getSuggestions();
  }, [debouncedQuery]);

  const handleSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    addToHistory(searchQuery);
    // In a real app, we might navigate to a results page here
    console.log('Searching for:', searchQuery);
    setQuery(searchQuery);
    setIsFocused(false);
    inputRef.current?.blur();
  };

  const clearInput = () => {
    setQuery('');
    setSuggestions([]);
    inputRef.current?.focus();
  };

  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto bg-white shadow-xl relative">
      {/* Search Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 p-4 pb-3">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => window.history.back()}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronLeft size={24} className="text-gray-600" />
          </button>
          
          <div className="flex-1 relative group">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
              <Sea size={18} />
            </div>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch(query)}
              placeholder="Search Frontend, Backend..."
              className="w-full bg-gray-100 border-transparent focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 rounded-2xl py-2.5 pl-10 pr-10 text-[16px] outline-none transition-all duration-200"
            />
            {query && (
              <button 
                onClick={clearInput}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 bg-gray-300 hover:bg-gray-400 text-white rounded-full transition-colors"
              >
                <X size={14} />
              </button>
            )}
          </div>
          
          <button 
            onClick={() => handleSearch(query)}
            className="text-blue-600 font-medium px-1 active:scale-95 transition-transform"
          >
            Search
          </button>
        </div>
      </header>

      {/* Content Area */}
      <main className="flex-1 overflow-y-auto px-4 py-2">
        {/* State: Initial/History (Shown when input is focused and query is empty) */}
        {(!query && isFocused) || (!query && history.length > 0) ? (
          <div className="space-y-6 mt-2">
            {history.length > 0 && (
              <section>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Search History</h3>
                  <button 
                    onClick={clearHistory}
                    className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {history.map((item, idx) => (
                    <div 
                      key={`${item}-${idx}`}
                      className="group flex items-center bg-gray-50 border border-gray-200 rounded-full pl-3 pr-2 py-1.5 active:bg-gray-100"
                    >
                      <span 
                        onClick={() => handleSearch(item)}
                        className="text-sm text-gray-700 cursor-pointer"
                      >
                        {item}
                      </span>
                      <button 
                        onClick={() => removeHistoryItem(item)}
                        className="ml-2 p-0.5 text-gray-300 group-hover:text-gray-500"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Trending Searches</h3>
              <div className="space-y-1">
                {['React 19', 'Zustand vs Redux', 'Node.js LTS', 'Tailwind v4'].map((trend) => (
                  <button 
                    key={trend}
                    onClick={() => handleSearch(trend)}
                    className="flex items-center gap-3 w-full p-3 hover:bg-gray-50 rounded-xl text-left transition-colors"
                  >
                    <TrendingUp size={16} className="text-blue-500" />
                    <span className="text-gray-700 font-medium">{trend}</span>
                  </button>
                ))}
              </div>
            </section>
          </div>
        ) : null}

        {/* State: Suggestions (Shown while typing) */}
        {query && (
          <div className="mt-2">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                <Loader2 size={32} className="animate-spin mb-2" />
                <p className="text-sm">Fetching suggestions...</p>
              </div>
            ) : suggestions.length > 0 ? (
              <ul className="divide-y divide-gray-100">
                {suggestions.map((item) => (
                  <li 
                    key={item.id}
                    onClick={() => handleSearch(item.title)}
                    className="py-4 cursor-pointer active:bg-gray-50 transition-colors group"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex gap-3">
                        <div className={`mt-1 p-2 rounded-lg ${item.category === 'frontend' ? 'bg-orange-50 text-orange-500' : 'bg-green-50 text-green-500'}`}>
                          <ExternalLink size={16} />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {item.title}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5 capitalize">{item.category} • {item.description}</p>
                        </div>
                      </div>
                      <ChevronLeft size={16} className="rotate-180 text-gray-300 group-hover:text-gray-400" />
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              !isLoading && (
                <div className="flex flex-col items-center justify-center py-20 text-gray-400 text-center">
                  <div className="bg-gray-100 p-4 rounded-full mb-4">
                    <Search size={40} className="text-gray-300" />
                  </div>
                  <p className="font-medium text-gray-600">No results for "{query}"</p>
                  <p className="text-sm max-w-[200px] mt-2">Try searching for common terms like "React" or "Node"</p>
                </div>
              )
            )}
          </div>
        )}
      </main>

      {/* Simple Footer Tip */}
      <footer className="p-4 text-center">
        <p className="text-[10px] text-gray-300 uppercase tracking-widest font-bold">Powered by Mock API Service</p>
      </footer>
    </div>
  );
};

export default Search;
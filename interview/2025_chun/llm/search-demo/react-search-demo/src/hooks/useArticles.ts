import { useState, useCallback } from 'react';
import { useArticlesStore } from '../store/articles';
import { debounce } from '../utils/debounce';
import { searchArticles } from '../api/articles';

export const useArticles = () => {
  const [loading, setLoading] = useState(false);
  const { articles, setArticles } = useArticlesStore();

  const searchArticlesDebounced = useCallback(
    debounce(async (query: string) => {
      setLoading(true);
      try {
        const data = await searchArticles(query);
        console.log(data, '//////?????');
        setArticles(data.data.data);
      } finally {
        setLoading(false);
      }
    }, 200),
    []
  );

  return {
    loading,
    articles,
    searchArticles: searchArticlesDebounced,
  };
};
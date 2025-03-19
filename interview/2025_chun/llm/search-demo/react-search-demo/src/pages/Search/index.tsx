import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { useArticles } from '@/hooks/useArticles';

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { loading, articles, searchArticles } = useArticles();
  const query = searchParams.get('q') || '';

  useEffect(() => {
    if (query) {
      searchArticles(query);
    }
  }, [query, searchArticles]);

  const handleSearch = (newQuery: string) => {
    setSearchParams({ q: newQuery });
  };

  useEffect(() => {
    console.log(articles, '?????');
  }, [articles])

  return (
    <div className="container mx-auto p-4">
      <Input
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search products..."
        className="mb-4"
      />

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid gap-4">
          

          {articles.map((article) => (
            <div
              key={article.id}
              className="p-4 border rounded shadow"
            >
              <h2 className="text-lg font-bold">{article.title}</h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
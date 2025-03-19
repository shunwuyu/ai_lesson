import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { useProducts } from '@/hooks/useProducts';

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { loading, products, searchProducts } = useProducts();
  const query = searchParams.get('q') || '';

  useEffect(() => {
    if (query) {
      searchProducts(query);
    }
  }, [query, searchProducts]);

  const handleSearch = (newQuery: string) => {
    setSearchParams({ q: newQuery });
  };

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
          {products.map((product) => (
            <div
              key={product.id}
              className="p-4 border rounded shadow"
            >
              <h2 className="text-lg font-bold">{product.title}</h2>
              <p className="text-gray-600">${product.price}</p>
              <p className="text-sm text-gray-500">
                Stock: {product.inventory}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
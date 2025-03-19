import { useState, useCallback } from 'react';
import { getProducts, searchProducts } from '../api/products';
import { useProductStore } from '../store/products';
import { debounce } from '../utils/debounce';

export const useProducts = () => {
  const [loading, setLoading] = useState(false);
  const { products, setProducts } = useProductStore();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getProducts();
      setProducts(data);
    } finally {
      setLoading(false);
    }
  };

  const searchProductsDebounced = useCallback(
    debounce(async (query: string) => {
      setLoading(true);
      try {
        const data = await searchProducts(query);
        setProducts(data);
      } finally {
        setLoading(false);
      }
    }, 200),
    []
  );

  return {
    loading,
    products,
    fetchProducts,
    searchProducts: searchProductsDebounced,
  };
};
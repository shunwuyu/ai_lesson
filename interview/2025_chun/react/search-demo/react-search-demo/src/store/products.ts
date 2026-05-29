import { create } from 'zustand';
import { Product } from '../types/product';

interface ProductsStore {
  products: Product[];
  setProducts: (products: Product[]) => void;
}

export const useProductStore = create<ProductsStore>((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
}));
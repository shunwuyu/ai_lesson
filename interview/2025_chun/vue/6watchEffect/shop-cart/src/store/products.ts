import { ref } from 'vue';
import { defineStore } from 'pinia';
import { getProducts } from '../api/product';

export interface Product {
  id: number;
  title: string;
  price: number;
  inventory: number;
}

export const useProductsStore = defineStore('products', () => {
  // 使用 `ref` 创建响应式的 products 数组
  const products = ref([] as Product[]);

  // 定义 loadProducts 函数来加载产品数据
  const loadProducts = async () => {
    products.value = await getProducts();
  };

  // 使用 `onMounted` 钩子在组件挂载时自动加载产品数据
  // 如果你希望在 store 初始化时就加载数据，可以直接调用 loadProducts()
  // onMounted() 可以根据实际场景选择是否使用
  loadProducts();

  return { products, loadProducts };
});
import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { useProductsStore } from './products';

type CartItem = {
  productId: number;
  quantity: number;
};

export const useCartStore = defineStore('cart', () => {
  // 使用 `ref` 来定义响应式的 items 数组
  const items = ref([] as CartItem[]);

  // 获取 products store
  const productsStore = useProductsStore();

  // 使用 `computed` 来计算 total price
  const totalPrice = computed(() => 
    items.value.reduce((total, item) => {
      const product = productsStore.products.find(p => p.id === item.productId);
      return total + (product?.price || 0) * item.quantity;
    }, 0)
  );

  // 定义 getQuantity 函数来获取特定商品的当前数量
  const getQuantity = (productId: number) => {
    const item = items.value.find(item => item.productId === productId);
    return item ? item.quantity : 0;
  };

  // 定义 addToCart 方法来处理添加商品到购物车的逻辑
  const addToCart = (productId: number) => {
    const product = productsStore.products.find(p => p.id === productId);
    if (!product) return;

    const currentQuantity = getQuantity(productId);
    if (currentQuantity >= product.inventory) return;

    const existingItem = items.value.find(item => item.productId === productId);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      items.value.push({ productId, quantity: 1 });
    }
  };

  return { items, totalPrice, getQuantity, addToCart };
});
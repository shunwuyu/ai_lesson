<template>
  <div class="product-list">
    <div v-for="product in products" :key="product.id" class="product-card">
      <h3>{{ product.title }}</h3>
      <p class="price">¥{{ product.price.toFixed(2) }}</p>
      <p class="inventory">
        库存: {{ product.inventory - cartStore.getQuantity(product.id) }}
      </p>
      <button
        @click="cartStore.addToCart(product.id)"
        :disabled="cartStore.getQuantity(product.id) >= product.inventory"
      >
        {{ buttonText(product.id) }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProductsStore } from '../store/products';
import { useCartStore } from '../store/cart';
import { computed, watch } from 'vue';

const productsStore = useProductsStore();
const cartStore = useCartStore();

const products = computed(() => productsStore.products);

const buttonText = (productId: number) => {
  const remaining = products.value.find(p => p.id === productId)!.inventory - 
                   cartStore.getQuantity(productId);
  return remaining > 0 ? '加入购物车' : '已售罄';
};

// 示例watch使用
watch(
  () => cartStore.items,
  () => {
    console.log('购物车变化:', cartStore.items);
  },
  { deep: true }
);
</script>

<style scoped>
.product-list {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
}

.product-card {
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 1rem;
  transition: box-shadow 0.3s;
}

.product-card:hover {
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

button {
  background: #42b983;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: opacity 0.3s;
}

button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.price {
  color: #f60;
  font-size: 1.2em;
  margin: 0.5rem 0;
}

.inventory {
  color: #666;
  margin: 0.5rem 0;
}
</style>
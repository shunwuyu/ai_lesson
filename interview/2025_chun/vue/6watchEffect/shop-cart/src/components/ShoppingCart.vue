<template>
  <div class="cart">
    <h2>购物车 ({{ totalItems }})</h2>
    <div v-if="items.length === 0" class="empty">购物车为空</div>
    <div v-else>
      <div v-for="item in items" :key="item.productId" class="cart-item">
        <div class="item-info">
          <h4>{{ item.product.title }}</h4>
          <p>单价: ¥{{ item.product.price.toFixed(2) }}</p>
        </div>
        <div class="item-quantity">
          ×{{ item.quantity }}
        </div>
        <div class="item-subtotal">
          ¥{{ (item.product.price * item.quantity).toFixed(2) }}
        </div>
      </div>
      <div class="total-price">
        总价: <strong>¥{{ cartStore.totalPrice.toFixed(2) }}</strong>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '../store/cart';
import { useProductsStore } from '../store/products';
import { computed } from 'vue';

const cartStore = useCartStore();
const productsStore = useProductsStore();

const items = computed(() => {
  return cartStore.items.map(item => ({
    ...item,
    product: productsStore.products.find(p => p.id === item.productId)!
  }));
});

const totalItems = computed(() => 
  cartStore.items.reduce((sum, item) => sum + item.quantity, 0)
);
</script>

<style scoped>
.cart {
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 1rem;
  background: #f8f8f8;
}

.empty {
  color: #666;
  padding: 1rem 0;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
}

.item-info {
  flex: 2;
}

.item-quantity {
  flex: 1;
  text-align: center;
}

.item-subtotal {
  flex: 1;
  text-align: right;
  color: #f60;
}

.total-price {
  padding: 1rem 0;
  text-align: right;
  font-size: 1.2em;
  border-top: 2px solid #eee;
  margin-top: 1rem;
}
</style>
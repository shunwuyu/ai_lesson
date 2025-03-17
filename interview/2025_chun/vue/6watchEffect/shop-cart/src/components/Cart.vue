<template>
  <div>
    <div>
      <h1>Shopping Cart</h1>
      <p>Total Cost: {{ totalCost }}</p>
      <button @click="fetchProducts">Fetch Products</button>
      <ul>
        <li v-for="item in cart" :key="item.id">
          {{ findProductById(item.id).title }} - {{ item.quantity }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, computed } from 'vue';
import { useCartStore } from '../store/cartStore';

const cartStore = useCartStore();
const totalCost = computed(() => cartStore.totalCost);
const findProductById = (id: number) => cartStore._products.find(product => product.id === id)!;

</script>

<style scoped>

</style>
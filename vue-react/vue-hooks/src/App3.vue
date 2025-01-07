<template>
  <div>
    <p>Mouse X: {{ x }}</p>
    <p>Mouse Y: {{ y }}</p>
  </div>
</template>

<script setup>
import { useMouse } from './hooks/useMouse';

const { x, y } = useMouse();
</script>
